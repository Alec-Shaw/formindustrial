import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  
import img1 from '../../img/is_kotel.jpg';
import img2 from '../../img/po_stene.jpg';
import img3 from '../../img/metall.jpg';
import img4 from '../../img/himself.jpg';

const Step2 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [selected, setSelected] = useState('');
    const [customLink, setCustomLink] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        updateFormData({ Вывод_из_котельной: value });
        clearError('вывод');  
        if (value !== 'Свой вариант') {
            clearError('customLink');  
        }
    };

    const handleCustomLinkChange = (e) => {
        const value = e.target.value;
        setCustomLink(value);
        updateFormData({ customLink: value });
        clearError('customLink'); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation fields object
        const fields = {
            вывод: selected,
            вывод_rules: { required: true },  
        };

        if (selected === 'Свой вариант') {
            fields.customLink = customLink;
            fields.customLink_rules = { required: true };  
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Вывод из котельной</h4>
            <form onSubmit={handleSubmit}>
                <div className="group_img">
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step2"
                            value="Вывод трубы из котельной"
                            checked={selected === 'Вывод трубы из котельной'}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img src={img1} alt="Вывод трубы из котельной" className="img_size" />
                            <span style={{ marginLeft: '10px' }}>Вывод трубы из котельной</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step2"
                            value="Вывод трубы по стене"
                            checked={selected === 'Вывод трубы по стене'}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img src={img2} alt="Вывод трубы по стене" className="img_size" />
                            <span style={{ marginLeft: '10px' }}>Вывод трубы по стене</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step2"
                            value="Металлоконструкция"
                            checked={selected === 'Металлоконструкция'}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img src={img3} alt="Металлоконструкция" className="img_size" />
                            <span style={{ marginLeft: '10px' }}>Металлоконструкция</span>
                        </div>
                    </label>
                    <label className="img_border">
                        <input
                            type="radio"
                            name="step2"
                            value="Свой вариант"
                            checked={selected === 'Свой вариант'}
                            onChange={handleChange}
                        />
                        <div className="img_choos">
                            <img src={img4} alt="Свой вариант" className="img_size" />
                            {selected === 'Свой вариант' && (
                                <input
                                    type="text"
                                    placeholder="Вставьте ссылку на файл"
                                    value={customLink}
                                    onChange={handleCustomLinkChange}
                                    style={{ marginLeft: '10px' }}
                                />
                            )}
                        </div>
                    </label>
                </div>
                
                {errors.вывод && <p className="error">{errors.вывод}</p>}
                
                {selected === 'Свой вариант' && errors.customLink && <p className="error">{errors.customLink}</p>}
                <div>
                    {onBack && (
                        <button type="button" onClick={onBack}>
                            Назад
                        </button>
                    )}
                    <button type="submit">Далее</button>
                </div>
            </form>
        </div>
    );
}

export default Step2;