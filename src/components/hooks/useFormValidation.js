import { useState } from 'react';

export const useFormValidation = () => {
    const [errors, setErrors] = useState({});  

    // Универсальная функция валидации поля
    const validateField = (fieldName, value, rules = {}) => {
        let error = '';

        if (rules.required && (!value || value.trim() === '')) {
            error = 'Это поле обязательно для заполнения';
        } else if (rules.oneof && (!value || value.trim() === '')) {
            error = 'Заполните хотябы одно из полей';
        } else if (rules.minLength && value.length < rules.minLength) {
            error = `Минимум ${rules.minLength} символов`;
        } else if (rules.number && (isNaN(Number(value)) || Number(value) <= 0)) {
            error = 'Введите положительное число';
        } else if (rules.email && !/^\S+@\S+\.\S+$/.test(value)) {
            error = 'Введите корректный email (например, example@mail.com)';
        }
        else if (rules.phone && !/^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(value)) {
            error = 'Введите корректный номер телефона (например, +7 (999) 123-45-67)';
        }
        
        return error;
    };

    // Проверка всех полей и установка ошибок
    const validateAll = (fields) => {
        const newErrors = {};
        Object.keys(fields).forEach(fieldName => {
            if (fieldName.endsWith('_rules')) return;  // Пропускаем правила
            const rules = fields[fieldName + '_rules'] || {};
            const error = validateField(fieldName, fields[fieldName], rules);
            if (error) newErrors[fieldName] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;  // true, если ошибок нет
    };

    // Очистка ошибки для поля
    const clearError = (fieldName) => {
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
    };

    // Теперь экспортируем setErrors для ручной установки (напр. общие ошибки)
    return { errors, setErrors, validateField, validateAll, clearError };
};


