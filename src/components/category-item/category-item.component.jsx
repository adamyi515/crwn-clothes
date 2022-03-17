import React from 'react'
import './category-item.styles.scss';


const CategoryItem = ({ category }) => {
    const { id, imageUrl, title, size } = category;

    return (
    <div className={`category-container ${size}`}>
        <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})`
        }}></div>
        
        <div className='category-body-container'>
            <h2>{ title.toUpperCase() }</h2>
            <p>SHOP NOW</p>
        </div>
    </div>
    ) 
}

export default CategoryItem;