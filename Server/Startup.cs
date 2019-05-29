using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using newProj.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Http;
using newProj.API.Helpers;
using Newtonsoft.Json;
using AutoMapper;
using Microsoft.AspNetCore.Antiforgery;

namespace newproj.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.P
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddJsonOptions(opt =>
            opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.AddTransient<Seed>();
            services.BuildServiceProvider().GetService<DataContext>().Database.EnsureCreated();
            services.AddCors();
            services.AddAutoMapper();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDatingRepository, DatingRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(Options =>
            {
                Options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed Seeder, IAntiforgery antiforgery )
        {
            app.Use(next => context =>
            {
                if (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(context.Request.Path.Value, "/index.html", System.StringComparison.OrdinalIgnoreCase))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions { HttpOnly = false});
                    //    context.Response.Cookies.Append("CSRF-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions { HttpOnly = false }); /* for ajax requests */
                }

                return next(context);
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(builder => builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    context.Response.ApplicationError(error.Error.Message);
                    if(error!=null){
                        await context.Response.WriteAsync(error.Error.Message);
                    }
                }));
            }


            //   app.UseHttpsRedirection();
            //Seeder.SeedUsers();
            app.UseCors(y => y.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseMvc(routes =>{ routes.MapSpaFallbackRoute(
                name:"Spa-FallBack",
                defaults: new { Controller = "FallBack", Action = "Index"}
            );

            });
        }
    }
}
