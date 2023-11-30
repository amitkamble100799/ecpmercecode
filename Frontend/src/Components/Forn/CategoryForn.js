import React from 'react'

const CategoryForn = ({handleSubmit,value,setValue}) => {
  return (
    <div>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter ne catefory' value={value} 
    onChange={(e)=>setValue(e.target.value)} />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default CategoryForn