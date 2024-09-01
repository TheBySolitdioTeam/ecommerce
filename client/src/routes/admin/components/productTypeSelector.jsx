/* eslint-disable react/prop-types */
export default function ProductTypeSelector({type}) {
    return type === 'furniture' ? (
      <div className="bg-secondary text-white p-5 m-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Color</span>
          </label>
          <input
            type="text"
            placeholder="color"
            className="input input-bordered text-white"
            name="color"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Material</span>
          </label>
          <input
            type="text"
            placeholder="Material"
            className="input input-bordered text-white"
            name="material"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Width(cm)</span>
          </label>
          <input
            type="number"
            placeholder="width"
            className="input input-bordered text-white"
            name="width"
            step=".1"
            min="0"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Length(cm)</span>
          </label>
          <input
            type="number"
            placeholder="width"
            className="input input-bordered text-white"
            name="length"
            step=".1"
            min="0"
            required
          />
        </div>
      </div>
    ) : type === 'clothing' ? (
      <div className="bg-secondary text-white p-5 m-3">
        {' '}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Color</span>
          </label>
          <input
            type="text"
            placeholder="color"
            className="input input-bordered text-white"
            name="color"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Size</span>
          </label>
          <input
            type="text"
            placeholder="Size"
            className="input input-bordered text-white"
            name="size"
            required
          />
        </div>
      </div>
    ) : (
      ''
    )
}