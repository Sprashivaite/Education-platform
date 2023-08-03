import { Request, Response } from "express";
import Course, { ICourse } from "../models/courseModel.js";
import { AuthenticatedRequest } from "../types/express.js";

export const getCourses = async (_: Request, response: Response) => {
  try {
    const courses = await Course.find();
    response.json(courses);
  } catch (error) {
    response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getCourseById = async (
  request: AuthenticatedRequest,
  response: Response
) => {
  const courseId = request.params.id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return response.status(404).json({ message: "Курс не найден" });
    }
    if (request.userId !== course.createdBy.toString()) {
      return response.status(403).json({
        message: "Доступ запрещен: Вы не являетесь владельцем этого курса",
      });
    }

    return response.json(course);
  } catch (error) {
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const createCourse = async (request: Request, response: Response) => {
  try {
    const { title, description, createdBy } = request.body;
    const newCourseData: ICourse = {
      title,
      description,
      createdBy,
    };

    const newCourse = new Course(newCourseData);
    const savedCourse = await newCourse.save();
    response.status(201).json(savedCourse);
  } catch (error) {
    response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateCourse = async (request: Request, response: Response) => {
  const courseId = request.params.id;
  const { title, description } = request.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true }
    );

    if (!updatedCourse) {
      return response.status(404).json({ message: "Курс не найден" });
    }

    return response.json(updatedCourse);
  } catch (error) {
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};
