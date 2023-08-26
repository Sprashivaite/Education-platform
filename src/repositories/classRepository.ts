import Class from "../models/classModel.js";

export const classRepository = {
  async findByAll(courseId: string) {
    const classDetail = await Class.find({ courseId });
    return classDetail;
  },
  async findById(classId: string) {
    const classDetail = await Class.findById(classId);
    return classDetail;
  },

  async updateClass(classId: string, title: string, description: string) {
    const classDetail = Class.findByIdAndUpdate(
      classId,
      { title, description },
      {
        new: true,
      }
    );
    return classDetail;
  },
  async addVideo(classId: string, filename: string) {
    const classDetail = await Class.findByIdAndUpdate(
      classId,
      { videoPath: filename },
      { new: true }
    );
    return classDetail;
  },
  async addLinkToClass(
    classId: string,
    newLink: {
      title: string;
      url: string;
    }
  ) {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: newLink } },
      { new: true }
    );
    return updatedClass;
  },

  async addFile(classId: string, filename: string) {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { files: filename } },
      { new: true }
    );
    return updatedClass;
  },
  async addAccess(classItem, userId: string) {
    classItem.grantedClassAccess.push(userId as any);
    await classItem.save();
  },
};
