using System;
using Microsoft.AspNetCore.Http;

namespace newProj.API.Helpers
{
    public static class Extensions
    {
        public static void ApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int FindAge(this DateTime birthDate)
        {
            var today = DateTime.Today;
            // Calculate the age.
            var age = today.Year - birthDate.Year;
            return age;
        }

    }
}