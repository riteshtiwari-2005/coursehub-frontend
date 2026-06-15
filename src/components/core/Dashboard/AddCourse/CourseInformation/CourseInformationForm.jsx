import { useState } from "react";

export default function CourseInformationForm() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseShortDesc: "",
    coursePrice: "",
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.courseTitle) {
      newErrors.courseTitle = "Course Title is required";
    }

    if (!formData.courseShortDesc) {
      newErrors.courseShortDesc = "Course Description is required";
    }

    if (!formData.coursePrice) {
      newErrors.coursePrice = "Course Price is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Course Title */}
      <div>
        <label>Course Title</label>

        <input
          type="text"
          name="courseTitle"
          value={formData.courseTitle}
          onChange={changeHandler}
          placeholder="Enter Course Title"
        />

        {errors.courseTitle && (
          <p>{errors.courseTitle}</p>
        )}
      </div>

      {/* Course Description */}
      <div>
        <label>Course Short Description</label>

        <textarea
          name="courseShortDesc"
          value={formData.courseShortDesc}
          onChange={changeHandler}
          placeholder="Enter Description"
        />

        {errors.courseShortDesc && (
          <p>{errors.courseShortDesc}</p>
        )}
      </div>

      {/* Course Price */}
      <div>
        <label>Course Price</label>

        <input
          type="number"
          name="coursePrice"
          value={formData.coursePrice}
          onChange={changeHandler}
          placeholder="Enter Course Price"
        />

        {errors.coursePrice && (
          <p>{errors.coursePrice}</p>
        )}
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  );
}