import React from 'react';
import './Filter.css';

interface FilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="filter-container">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
