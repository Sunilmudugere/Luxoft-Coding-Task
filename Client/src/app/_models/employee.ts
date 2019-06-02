import { Component } from '@angular/core';

export class Employee {
  constructor(){
    this.dateOfBirth = new Date(1985,6,6);
  }
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  city: string;
  country: string;
  isDeleted: boolean;
}