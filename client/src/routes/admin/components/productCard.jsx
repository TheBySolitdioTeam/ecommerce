/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import {Link} from 'react-router-dom'
export default function ProductCard({ item }) {
    return (
      <div className="card m-5  bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            className="max-h-80"
            src={'http://localhost:5500/products/' + item.images.split(';')[0]}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p> {item.description} </p>
          <div className="card-actions flex flex-col justify-end">
            <div>
              <div className="badge badge-outline"> {item.category.name} </div>
              <div className="badge badge-outline"> {item.type} </div> <br />
            </div>
            <Link
              to={`/admin/products/edit/${item._id}?type=${item.type}`}
              className="btn btn-warning"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    )
}