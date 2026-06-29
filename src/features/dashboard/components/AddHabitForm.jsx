import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import './AddHabitForm.css';
import Button from '../../../shared/components/Button';
import { createHabit, getCategoryColor } from '../../../shared/utils/habitStorage';

const AddHabitForm = ({ onSubmit, onClose, habit }) => {
  const [habitName, setHabitName] = useState(habit?.name || '');
  const [category, setCategory] = useState(habit?.category || '');
  const [frequency, setFrequency] = useState(habit?.frequency || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const isComplete = habitName.trim() && category && frequency;

  const validate = (showAll = true, values = { habitName, category, frequency }) => {
    const newErrors = {};
    if (!values.habitName.trim()) newErrors.habitName = 'Habit name is required';
    if (!values.category) newErrors.category = 'Please select a category';
    if (!values.frequency) newErrors.frequency = 'Please select a frequency';
    setErrors(newErrors);
    if (showAll) setTouched({ habitName: true, category: true, frequency: true });
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field, value) => {
    setErrors((prev) => {
      const nextErrors = { ...prev };
      if (field === 'habitName' && !value.trim()) {
        nextErrors.habitName = 'Habit name is required';
      } else if (field === 'category' && !value) {
        nextErrors.category = 'Please select a category';
      } else if (field === 'frequency' && !value) {
        nextErrors.frequency = 'Please select a frequency';
      } else {
        delete nextErrors[field];
      }
      return nextErrors;
    });
  };

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const habitData = habit
      ? {
          ...habit,
          name: habitName.trim(),
          category,
          frequency,
          description,
          color: getCategoryColor(category),
        }
      : createHabit({
          name: habitName.trim(),
          category,
          frequency,
          description,
          color: getCategoryColor(category),
        });

    setSuccessMessage(habit ? 'Habit updated successfully.' : 'Habit added successfully.');
    onSubmit?.(habitData);
    setTimeout(() => onClose?.(), 450);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    if (value.length <= 120) setDescription(value);
  };

  return (
    <div className="add-habit-card" onClick={(event) => event.stopPropagation()}>
      <div className="form-header">
        <div className="icon-container">
          <Sparkles className="sparkles-icon" size={20} />
        </div>
        <div className="header-text">
          <h2>{habit ? 'Edit Habit' : 'Add New Habit'}</h2>
          <p>{habit ? 'Tune the routine you are building.' : 'Build a new habit to become a better you.'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="habit-form" noValidate>
        <div className="form-group">
          <label htmlFor="habitName" className="form-label">
            Habit Name <span className="required-star">*</span>
          </label>
          <input
            type="text"
            id="habitName"
            className={`form-input ${touched.habitName && errors.habitName ? 'input-error' : ''}`}
            placeholder="e.g., Read 20 pages"
            value={habitName}
            onBlur={() => {
              markTouched('habitName');
              validateField('habitName', habitName);
            }}
            onChange={(event) => {
              const value = event.target.value;
              setHabitName(value);
              if (touched.habitName) validateField('habitName', value);
            }}
          />
          {touched.habitName && errors.habitName && <p className="error-message">{errors.habitName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required-star">*</span>
          </label>
          <div className="select-wrapper">
            <select
              id="category"
              className={`form-select ${touched.category && errors.category ? 'input-error' : ''} ${!category ? 'placeholder-selected' : ''}`}
              value={category}
              onBlur={() => {
                markTouched('category');
                validateField('category', category);
              }}
              onChange={(event) => {
                const value = event.target.value;
                setCategory(value);
                markTouched('category');
                validateField('category', value);
              }}
            >
              <option value="" disabled hidden>Select a category</option>
              <option value="Health">Health</option>
              <option value="Productivity">Productivity</option>
              <option value="Learning">Learning</option>
              <option value="Finance">Finance</option>
              <option value="Relationships">Relationships</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          {touched.category && errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="frequency" className="form-label">
            Frequency <span className="required-star">*</span>
          </label>
          <div className="select-wrapper">
            <select
              id="frequency"
              className={`form-select ${touched.frequency && errors.frequency ? 'input-error' : ''} ${!frequency ? 'placeholder-selected' : ''}`}
              value={frequency}
              onBlur={() => {
                markTouched('frequency');
                validateField('frequency', frequency);
              }}
              onChange={(event) => {
                const value = event.target.value;
                setFrequency(value);
                markTouched('frequency');
                validateField('frequency', value);
              }}
            >
              <option value="" disabled hidden>Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          {touched.frequency && errors.frequency && <p className="error-message">{errors.frequency}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <div className="textarea-container">
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Add a short description..."
              value={description}
              onChange={handleDescriptionChange}
            />
            <span className="char-count">{description.length}/120</span>
          </div>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <Button type="submit" className="submit-button" disabled={!isComplete}>
          <span>{habit ? 'Save Changes' : 'Add Habit'}</span>
          <ArrowRight size={18} />
        </Button>

        <p className="required-footer">
          All fields marked with <span className="required-star">*</span> are required.
        </p>
      </form>
    </div>
  );
};

export default AddHabitForm;
