import React, { useState, useEffect } from 'react';  // Убрал useEffect — сброс состояния при onBack
import { useFormValidation } from '../hooks/useFormValidation';  // Путь к хуку (адаптируйте)

const Step16 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    // Определяем количество котлов из Step3 (парсим текст)
    const step3Text = formData.Количество_котлов_и_расположение_котлов_и_тип_несущей_башни || '';
    const numBoilers = parseInt(step3Text.match(/(\d+) кот/)[1] || 1);  // "1 котел" -> 1, "2 котла" -> 2 и т.д.

    // Локальное состояние для всех котлов (объект {1: {power: ''}, 2: {...}})
    const [boilerData, setBoilerData] = useState({});  // Дефолт пустой

    // Инициализация для N котлов (useEffect, чтобы избежать infinite loop)
    useEffect(() => {
        const data = {};
        for (let i = 1; i <= numBoilers; i++) {
            data[i] = {
                name: '',
                fuelType: '',
                power: '',
                oxigen: '',
                flow: '',
                degree: '',
                pressure: '',
                pipeBranch: '',
                connect: '',
                economizer: 'Нет',  
                dymosos: 'Нет',  
                diameter: '',
                height: '',
            };
        }
        setBoilerData(data);
    }, [numBoilers]);  

   
    const handleFieldChange = (boilerNum, field, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], [field]: value }
        }));
        
        updateFormData({ [`Котел${boilerNum}_${field}`]: value });
        clearError(`${field}_${boilerNum}`);  // Убираем ошибку
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        const fields = {};
        for (let i = 1; i <= numBoilers; i++) {
            const boiler = boilerData[i];
            
            fields[`name_${i}`] = boiler.name;
            fields[`name_${i}_rules`] = { required: true };

            fields[`fuelType_${i}`] = boiler.fuelType;
            fields[`fuelType_${i}_rules`] = { required: true };

           
            if (boiler.fuelType === 'Свой вариант') {
                fields[`customFuel_${i}`] = boiler.customFuel;
                fields[`customFuel_${i}_rules`] = { required: true };
            }

            fields[`power_${i}`] = boiler.power;
            fields[`power_${i}_rules`] = { required: true };

            fields[`oxigen_${i}`] = boiler.oxigen;
            fields[`oxigen_${i}_rules`] = { required: true };

            fields[`flow_${i}`] = boiler.flow;
            fields[`flow_${i}_rules`] = { required: true };

            fields[`degree_${i}`] = boiler.degree;
            fields[`degree_${i}_rules`] = { required: true };

            fields[`pressure_${i}`] = boiler.pressure;
            fields[`pressure_${i}_rules`] = { required: true };

            fields[`pipeBranch_${i}`] = boiler.pipeBranch;
            fields[`pipeBranch_${i}_rules`] = { required: true };

            fields[`connect_${i}`] = boiler.connect;
            fields[`connect_${i}_rules`] = { required: true };

            fields[`economizer_${i}`] = boiler.economizer;
            fields[`economizer_${i}_rules`] = { required: true };

            fields[`dymosos_${i}`] = boiler.dymosos;
            fields[`dymosos_${i}_rules`] = { required: true };

            fields[`diameter_${i}`] = boiler.diameter;
            fields[`diameter_${i}_rules`] = { required: true, number: true };

            fields[`height_${i}`] = boiler.height;
            fields[`height_${i}_rules`] = { required: true, number: true };
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }
        onNext();  
    };

    // JSX: Цикл для N котлов
    const renderBoilerForm = (boilerNum) => {
        const boiler = boilerData[boilerNum] || {};
        return (
            <div key={boilerNum} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
                <h5>Котел {boilerNum}</h5>
                <div className='quest'>Название котла</div>
                <label>
                    <input
                        type="text"
                        placeholder="Введите название"
                        value={boiler.name || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'name', e.target.value)}
                    />
                </label>
                {errors[`name_${boilerNum}`] && <p className="error">{errors[`name_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Тип топлива</div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name={`fuelType_${boilerNum}`}
                            value="Газ"
                            checked={boiler.fuelType === "Газ"}
                            onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)}
                        />
                        Газ
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name={`fuelType_${boilerNum}`}
                            value="Дизель"
                            checked={boiler.fuelType === "Дизель"}
                            onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)}
                        />
                        Дизель
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name={`fuelType_${boilerNum}`}
                            value="Газ/дизел"
                            checked={boiler.fuelType === "Газ/дизел"}
                            onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)}
                        />
                        Газ/дизел
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name={`fuelType_${boilerNum}`}
                            value="Дрова"
                            checked={boiler.fuelType === "Дрова"}
                            onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)}
                        />
                        Дрова
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            name={`fuelType_${boilerNum}`}
                            value="Уголь"
                            checked={boiler.fuelType === "Уголь"}
                            onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)}
                        />
                        Уголь
                    </label>
                    <br />

                    {errors[`fuelType_${boilerNum}`] && <p className="error">{errors[`fuelType_${boilerNum}`]}</p>}
                </div>
                <br />
                <div className='quest'>Параметры теплогенератора (Котел {boilerNum})</div>
                <label>
                    <span className='table_boiler'>Тепловая мощность топки (кВт) или КПД котла, Мин/Макс</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс"
                        value={boiler.power || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'power', e.target.value)}
                    />
                </label>
                {errors[`power_${boilerNum}`] && <p className="error">{errors[`power_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Содержание СО2 в дымовых газах в % или Содержание О2 в дымовых газах в %</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс О2 или СО2"
                        value={boiler.oxigen || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'oxigen', e.target.value)}
                    />
                </label>
                {errors[`oxigen_${boilerNum}`] && <p className="error">{errors[`oxigen_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Массовый поток дымовых газов (г/с, кг/с, кг/ч или Объемный поток дымовых газов (куб.м/ч))</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс масса или объем"
                        value={boiler.flow || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'flow', e.target.value)}
                    />
                </label>
                {errors[`flow_${boilerNum}`] && <p className="error">{errors[`flow_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Температура дымовых газов (°С)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс"
                        value={boiler.degree || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'degree', e.target.value)}
                    />
                </label>
                {errors[`degree_${boilerNum}`] && <p className="error">{errors[`degree_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Остаточное давление вентилятора (для котлов с принудительным отводом), Па или Требуемое разряжение в дымоходе (для котлов с естественным отводом продуктов сгорания), Па</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс"
                        value={boiler.pressure || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'pressure', e.target.value)}
                    />
                </label>
                {errors[`pressure_${boilerNum}`] && <p className="error">{errors[`pressure_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Выход дымоотводящего патрубка</div>
                <label>
                    <input
                        type="radio"
                        name={`pipeBranch_${boilerNum}`}
                        value="Вверх"
                        checked={boiler.pipeBranch === "Вверх"}
                        onChange={(e) => handleFieldChange(boilerNum, 'pipeBranch', e.target.value)}
                    />
                    Вверх
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`pipeBranch_${boilerNum}`}
                        value="Вбок"
                        checked={boiler.pipeBranch === "Вбок"}
                        onChange={(e) => handleFieldChange(boilerNum, 'pipeBranch', e.target.value)}
                    />
                    Вбок
                </label>
                {errors[`pipeBranch_${boilerNum}`] && <p className="error">{errors[`pipeBranch_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Подключение к котлу</div>
                <label>
                    <input
                        type="radio"
                        name={`connect_${boilerNum}`}
                        value="Патрубок"
                        checked={boiler.connect === "Патрубок"}
                        onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)}
                    />
                    Патрубок
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`connect_${boilerNum}`}
                        value="Фланец"
                        checked={boiler.connect === "Фланец"}
                        onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)}
                    />
                    Фланец
                </label>
                {errors[`connect_${boilerNum}`] && <p className="error">{errors[`connect_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Есть ли после котла экономайзер</div>
                <label>
                    <input
                        type="radio"
                        name={`economizer_${boilerNum}`}
                        value="Да"
                        checked={boiler.economizer === 'Да'}
                        onChange={(e) => handleFieldChange(boilerNum, 'economizer', e.target.value)}
                    />
                    Да
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`economizer_${boilerNum}`}
                        value="Нет"
                        checked={boiler.economizer === 'Нет'}
                        onChange={(e) => handleFieldChange(boilerNum, 'economizer', e.target.value)}
                    />
                    Нет
                </label>
                {errors[`economizer_${boilerNum}`] && <p className="error">{errors[`economizer_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Есть ли после котла дымосос</div>
                <label>
                    <input
                        type="radio"
                        name={`dymosos_${boilerNum}`}
                        value="Да"
                        checked={boiler.dymosos === 'Да'}
                        onChange={(e) => handleFieldChange(boilerNum, 'dymosos', e.target.value)}
                    />
                    Да
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`dymosos_${boilerNum}`}
                        value="Нет"
                        checked={boiler.dymosos === 'Нет'}
                        onChange={(e) => handleFieldChange(boilerNum, 'dymosos', e.target.value)}
                    />
                    Нет
                </label>
                {errors[`dymosos_${boilerNum}`] && <p className="error">{errors[`dymosos_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Диаметр дымоотводящего патрубка (dk)</div>
                <label>
                    <input
                        type="text"
                        placeholder="Введите значение"
                        value={boiler.diameter || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'diameter', e.target.value)}
                    />
                </label>
                {errors[`diameter_${boilerNum}`] && <p className="error">{errors[`diameter_${boilerNum}`]}</p>}
                <br />
                <div className='quest'>Высота дымоотводящего патрубка (hk)</div>
                <label>
                    <input
                        type="text"
                        placeholder="Введите значение"
                        value={boiler.height || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'height', e.target.value)}
                    />
                </label>
                {errors[`height_${boilerNum}`] && <p className="error">{errors[`height_${boilerNum}`]}</p>}
            </div>
        );
    };

    // Рендер всех форм котлов
    const boilersForms = [];
    for (let i = 1; i <= numBoilers; i++) {
        boilersForms.push(renderBoilerForm(i));
    }

    return (
        <div>
            <h4>Параметры котлов (Количество: {numBoilers})</h4>
            <form onSubmit={handleSubmit}>
                {boilersForms}
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step16;