import { useState } from "react"
import { useSelector } from "react-redux"

import { createCategory } from "../../../services/operations/courseDetailsAPI"

export default function CreateCategory() {
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim()) return

    setLoading(true)
    const result = await createCategory(formData, token)
    if (result) {
      setFormData({ name: "", description: "" })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="section-kicker">Instructor</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900">
          Create Category
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-7 text-slate-500">
          Create a new category for your courses and organize content from the instructor dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="dashboard-card space-y-6 p-8">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-slate-700">
            Category name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            className="form-style w-full"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-bold text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short category description"
            rows={5}
            className="form-style w-full resize-none"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary min-h-[48px] w-full text-base font-bold" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  )
}