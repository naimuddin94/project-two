import { Router } from "express";
import { createStudent } from "./student.controller";


const studentRoute = Router();

studentRoute.route('/create-student').post(createStudent);
