import { useState } from "react";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const saveCategory = () => {
    let data = { title, description };

    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "35rem",marginTop:"80px" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h5 className="card-title">Add Category</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label for="title" className="form-label">
                  <b>Category Title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="enter title.."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">
                  <b>Category Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="enter description.."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>

              <button
                type="submit"
                onClick={saveCategory}
                className="btn bg-color custom-bg-text"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
