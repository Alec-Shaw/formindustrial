import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  
import image_pic from '../../img/pic.jpg';

const Step8 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [economizer, setEconomizer] = useState('Нет');
    const [dymosos, setDymosos] = useState('Нет');

   
    useEffect(() => {
        if (formData.Экономайзер) setEconomizer(formData.Экономайзер);
        if (formData.Дымосос) setDymosos(formData.Дымосос);
        if (formData.Экономайзер === undefined || formData.Дымосос === undefined) {
            updateFormData({
                Экономайзер: 'Нет',
                Дымосос: 'Нет',
            });
        }
    }, [formData.Экономайзер, formData.Дымосос]);

    
    const handleEconomizerChange = (e) => {
        const value = e.target.value;
        setEconomizer(value);
        updateFormData({ Экономайзер: value });
        clearError('Экономайзер');  
    };

    const handleDymososChange = (e) => {
        const value = e.target.value;
        setDymosos(value);
        updateFormData({ Дымосос: value });
        clearError('Дымосос');
    };

    const handleDiametrChange = (e) => {
        const value = e.target.value;
        updateFormData({ Диаметр_dk: value });
        clearError('Диаметр_dk');
    };

    const handleVisotaChange = (e) => {
        const value = e.target.value;
        updateFormData({ Высота_hk: value });
        clearError('Высота_hk');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            Экономайзер: formData.Экономайзер || economizer,  
            Экономайзер_rules: { required: true },  
            Дымосос: formData.Дымосос || dymosos,
            Дымосос_rules: { required: true },
            Диаметр_dk: formData.Диаметр_dk,
            Диаметр_dk_rules: { required: true, number: true },  
            Высота_hk: formData.Высота_hk,
            Высота_hk_rules: { required: true, number: true },
        };

        const isValid = validateAll(fields);
        if (!isValid) {
           
            return;
        }
        onNext();
    };

    return (
        <div className='img_right'>
            <div>
                <h4>Экономайзер, дымосос</h4>
                <form onSubmit={handleSubmit}>
                    <div className='quest'>Есть ли после котла экономайзер</div>
                    <label>
                        <input
                            type="radio"
                            id="option1"
                            name="economaizer"
                            value="Да"
                            checked={economizer === 'Да'}
                            onChange={handleEconomizerChange}
                        />
                        Да
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            id="option2"
                            name="economaizer"
                            value="Нет"
                            checked={economizer === 'Нет'}
                            onChange={handleEconomizerChange}
                        />
                        Нет
                    </label>
                    
                    {errors.Экономайзер && <p className="error">{errors.Экономайзер}</p>}
                    <br />
                    <div className='quest'>Есть ли после котла дымосос</div>
                    <label>
                        <input
                            type="radio"
                            id="option3"
                            name="dymosos"
                            value="Да"
                            checked={dymosos === 'Да'}
                            onChange={handleDymososChange}
                        />
                        Да
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            id="option4"
                            name="dymosos"
                            value="Нет"
                            checked={dymosos === 'Нет'}
                            onChange={handleDymososChange}
                        />
                        Нет
                    </label>
                    {errors.Дымосос && <p className="error">{errors.Дымосос}</p>}
                    <br />
                    <div className='quest'>Диаметр дымоотводящего патрубка (dk)</div>
                    <label>
                        <input
                            type="text"
                            id="diametr"
                            name="diametr"
                            onChange={handleDiametrChange}
                            placeholder="Введите значение"
                            value={formData.Диаметр_dk || ''}
                        />
                    </label>
                    {errors.Диаметр_dk && <p className="error">{errors.Диаметр_dk}</p>}
                    <br />
                    <div className='quest'>Высота дымоотводящего патрубка (hk)</div>
                    <label>
                        <input
                            type="text"
                            id="visota"
                            name="visota"
                            onChange={handleVisotaChange}
                            placeholder="Введите значение"
                            value={formData.Высота_hk || ''}
                        />
                    </label>
                    {errors.Высота_hk && <p className="error">{errors.Высота_hk}</p>}
                    <br />
                    {onBack && <button type="button" onClick={onBack}>Назад</button>}
                    <button type="submit">Далее</button>
                </form>
            </div>
            <img className='img_size_2' src={image_pic} alt="" />
        </div>
    );
};

export default Step8;