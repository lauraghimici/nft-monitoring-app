import React from 'react';
import "../Button/Button.css"

export const UpdateForm = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="containerForm">
            <div className="form-group">
                <div className='form-each'>
                <label htmlFor="totalSupply">Total Supply: </label>
                <input className="form-control" id="totalSupply" />
                </div>
                <div className='form-each'>
                <label htmlFor="numOwners">Num Owners:   </label>
                <input className="form-control" id="numOwners" />
                </div>
                <div className='form-each'>
                <label htmlFor="sevenDaySales">Seven day sales:   </label>
                <input className="form-control" id="sevenDaySales" />
                </div>
                <div className='form-each'>
                <label htmlFor="totalVolume">Total volume:   </label>
                <input className="form-control" id="totalVolume" />
                </div>
                <div className='form-each'>
                <label htmlFor="floorPrice">Floor Price:     </label>
                <input className="form-control" id="floorPrice" />
                </div>
            </div>
            <div className="form-group">
                <button className="button buttonSubmit" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default UpdateForm;
