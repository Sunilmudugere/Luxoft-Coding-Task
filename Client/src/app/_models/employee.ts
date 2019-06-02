import { Component } from '@angular/core';

export interface Employee {
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