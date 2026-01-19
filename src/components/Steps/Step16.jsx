import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';

const Step16 = ({ formData, updateFormData, onNext, onBack }) => {
  const { errors, validateAll, clearError } = useFormValidation();

  //const [underpressure, setSubChoice] = useState('');

  // Определяем количество котлов из Step3
  const step3Text = formData.Количество_котлов_и_расположение_котлов_и_тип_несущей_башни || '';
  const numBoilers = parseInt(step3Text.match(/(\d+) кот/)?.[1] || 1);

  // Локальное состояние для всех котлов
  const [boilerData, setBoilerData] = useState({});

  useEffect(() => {
    const data = {};
    for (let i = 1; i <= numBoilers; i++) {
      data[i] = {
        name: '',
        fuelType: '',
        customFuel: '',
        heatingCapacity: '',
        powerMin: '',
        powerMax: '',
        oxigenMin: '',
        oxigenMax: '',
        flow: '',
        flowMin: '',
        flowMax: '',
        degreeMin: '',
        degreeMax: '',
        underpressure: '',
        pressureMin: '',
        pressureMax: '',
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
    clearError(`${field}_${boilerNum}`);
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

      fields[`underpressure_${i}`] = boiler.underpressure;
      fields[`underpressure_${i}_rules`] = { required: true };

      fields[`flow_${i}`] = boiler.flow;
      fields[`flow_${i}_rules`] = { required: true };

      if (boiler.fuelType === 'Свой вариант') {
        fields[`customFuel_${i}`] = boiler.customFuel;
        fields[`customFuel_${i}_rules`] = { required: true };
      }

      fields[`heatingCapacity_${i}`] = boiler.heatingCapacity;
      fields[`heatingCapacity_${i}_rules`] = { required: true };

      // Мин/Макс поля
      fields[`powerMin_${i}`] = boiler.powerMin;
      fields[`powerMin_${i}_rules`] = { required: true, number: true };
      fields[`powerMax_${i}`] = boiler.powerMax;
      fields[`powerMax_${i}_rules`] = { required: true, number: true };

      fields[`oxigenMin_${i}`] = boiler.oxigenMin;
      fields[`oxigenMin_${i}_rules`] = { required: true, number: true };
      fields[`oxigenMax_${i}`] = boiler.oxigenMax;
      fields[`oxigenMax_${i}_rules`] = { required: true, number: true };
      

      fields[`flowMin_${i}`] = boiler.flowMin;
      fields[`flowMin_${i}_rules`] = { required: true, number: true };
      fields[`flowMax_${i}`] = boiler.flowMax;
      fields[`flowMax_${i}_rules`] = { required: true, number: true };

      fields[`degreeMin_${i}`] = boiler.degreeMin;
      fields[`degreeMin_${i}_rules`] = { required: true, number: true };
      fields[`degreeMax_${i}`] = boiler.degreeMax;
      fields[`degreeMax_${i}_rules`] = { required: true, number: true };

      fields[`pressureMin_${i}`] = boiler.pressureMin;
      fields[`pressureMin_${i}_rules`] = { required: true, number: true };
      fields[`pressureMax_${i}`] = boiler.pressureMax;
      fields[`pressureMax_${i}_rules`] = { required: true, number: true };

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
    if (!isValid) return;
    onNext();
  };

  const renderBoilerForm = (boilerNum) => {
    const boiler = boilerData[boilerNum] || {};

    return (
      <div key={boilerNum} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
        <h4 style={{ marginTop: 0 }}>Котел {boilerNum}</h4>

        {/* Название котла */}
        <label>
          <span>Название котла</span><br/>
          <input
            type="text"
            value={boiler.name || ''}
            onChange={(e) => handleFieldChange(boilerNum, 'name', e.target.value)}
          />
          {errors[`name_${boilerNum}`] && <p className="error">{errors[`name_${boilerNum}`]}</p>}
        </label><br/>

        {/* Тип топлива */}
        
          <div className='quest'>Тип топлива</div>
          <label><input type="radio" name={`fuelType_${boilerNum}`} value="Газ" checked={boiler.fuelType === "Газ"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Газ</label><br/>
          <label><input type="radio" name={`fuelType_${boilerNum}`} value="Дизель" checked={boiler.fuelType === "Дизель"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Дизель</label><br/>
          <label><input type="radio" name={`fuelType_${boilerNum}`} value="Газ/дизел" checked={boiler.fuelType === "Газ/дизел"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Газ/дизель</label><br/>
          <label><input type="radio" name={`fuelType_${boilerNum}`} value="Дрова" checked={boiler.fuelType === "Дрова"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Дрова</label><br/>
          <label><input type="radio" name={`fuelType_${boilerNum}`} value="Уголь" checked={boiler.fuelType === "Уголь"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Уголь</label>
          {/* <label><input type="radio" name={`fuelType_${boilerNum}`} value="Свой вариант" checked={boiler.fuelType === "Свой вариант"} onChange={(e) => handleFieldChange(boilerNum, 'fuelType', e.target.value)} /> Свой вариант</label>
          {boiler.fuelType === 'Свой вариант' && (
            <input
              type="text"
              placeholder="Укажите свой вариант"
              value={boiler.customFuel || ''}
              onChange={(e) => handleFieldChange(boilerNum, 'customFuel', e.target.value)}
            />
          )} */}
          {errors[`fuelType_${boilerNum}`] && <p className="error">{errors[`fuelType_${boilerNum}`]}</p>}
          {errors[`customFuel_${boilerNum}`] && <p className="error">{errors[`customFuel_${boilerNum}`]}</p>}

        <h4>Параметры теплогенератора (Котел {boilerNum})</h4>

        {/* Номинальная теплопроизводительность */}
        <label>
          <span>Номинальная теплопроизводительность (кВт)</span><br/>
          <input type="text" value={boiler.heatingCapacity || ''} onChange={(e) => handleFieldChange(boilerNum, 'heatingCapacity', e.target.value)} />
          {errors[`heatingCapacity_${boilerNum}`] && <p className="error">{errors[`heatingCapacity_${boilerNum}`]}</p>}
        </label><br/>

        {/* Тепловая мощность топки - Мин/Макс */}
        <label>
          <span>Тепловая мощность топки (кВт)</span><br/>
          <span>Мин: <input type="text" style={{width: '80px'}} value={boiler.powerMin || ''} onChange={(e) => handleFieldChange(boilerNum, 'powerMin', e.target.value)} /></span>
          <span style={{marginLeft: '20px'}}>Макс: <input type="text" style={{width: '80px'}} value={boiler.powerMax || ''} onChange={(e) => handleFieldChange(boilerNum, 'powerMax', e.target.value)} /></span>
          {errors[`powerMin_${boilerNum}`] && <p className="error">{errors[`powerMin_${boilerNum}`]}</p>}
          {errors[`powerMax_${boilerNum}`] && <p className="error">{errors[`powerMax_${boilerNum}`]}</p>}
        </label><br/>

        {/* СО2/О2 - Мин/Макс */}
        <label>
          <span>Содержание СО2 в дымовых газах в % или Содержание О2 в дымовых газах в %</span><br/>
          <span>Мин: <input type="text" style={{width: '80px'}} value={boiler.oxigenMin || ''} onChange={(e) => handleFieldChange(boilerNum, 'oxigenMin', e.target.value)} /></span>
          <span style={{marginLeft: '20px'}}>Макс: <input type="text" style={{width: '80px'}} value={boiler.oxigenMax || ''} onChange={(e) => handleFieldChange(boilerNum, 'oxigenMax', e.target.value)} /></span>
          {errors[`oxigenMin_${boilerNum}`] && <p className="error">{errors[`oxigenMin_${boilerNum}`]}</p>}
          {errors[`oxigenMax_${boilerNum}`] && <p className="error">{errors[`oxigenMax_${boilerNum}`]}</p>}
        </label><br/>

        {/* Массовый/объемный поток - Мин/Макс */}
        
          <div className='quest'>Массовый поток дымовых газов (г/с, кг/с, кг/ч) или Объемный поток (куб.м/ч)</div>
          <div style={{display: 'flex'}}>
              <input
                                    type="radio"
                                    id="flow"
                                    name="flow"
                                    value="Массовый поток дымовых газов (г/с, кг/с, кг/ч)"
                                    checked={boiler.flow === "Массовый поток дымовых газов (г/с, кг/с, кг/ч)"}
                                    onChange={(e) => handleFieldChange(boilerNum, 'flow', e.target.value)}
                                />
                                Массовый поток дымовых газов (г/с, кг/с, кг/ч)
          </div>
          <br/>
          <div style={{display: 'flex'}}>
                <input
                                    type="radio"
                                    id="volumeFlow"
                                    name="flow"
                                    value="Объемный поток (куб.м/ч)"
                                    checked={boiler.flow === "Объемный поток (куб.м/ч)"}
                                    onChange={(e) => handleFieldChange(boilerNum, 'flow', e.target.value)}
                                />
                                Объемный поток (куб.м/ч)
          </div>
          <br/>
          {(boiler.flow === 'Объемный поток (куб.м/ч)' || boiler.flow === 'Массовый поток дымовых газов (г/с, кг/с, кг/ч)') && (
          <div>
          <span>Мин: <input type="text" style={{width: '80px'}} value={boiler.flowMin || ''} onChange={(e) => handleFieldChange(boilerNum, 'flowMin', e.target.value)} /></span>
          <span style={{marginLeft: '20px'}}>Макс: <input type="text" style={{width: '80px'}} value={boiler.flowMax || ''} onChange={(e) => handleFieldChange(boilerNum, 'flowMax', e.target.value)} /></span>
          </div>
          )}
          {errors[`flowMin_${boilerNum}`] && <p className="error">{errors[`flowMin_${boilerNum}`]}</p>}
          {errors[`flowMax_${boilerNum}`] && <p className="error">{errors[`flowMax_${boilerNum}`]}</p>}
        <br/>

        {/* Температура - Мин/Макс */}
       
        <label>
          <span>Температура дымовых газов (°С)</span><br/>
          <span>Мин: <input type="text" style={{width: '80px'}} value={boiler.degreeMin || ''} onChange={(e) => handleFieldChange(boilerNum, 'degreeMin', e.target.value)} /></span>
          <span style={{marginLeft: '20px'}}>Макс: <input type="text" style={{width: '80px'}} value={boiler.degreeMax || ''} onChange={(e) => handleFieldChange(boilerNum, 'degreeMax', e.target.value)} /></span>
          {errors[`degreeMin_${boilerNum}`] && <p className="error">{errors[`degreeMin_${boilerNum}`]}</p>}
          {errors[`degreeMax_${boilerNum}`] && <p className="error">{errors[`degreeMax_${boilerNum}`]}</p>}
        </label><br/>

        {/* Давление - Мин/Макс */}
        <div className='quest'>Остаточное давление вентилятора (Па) или Требуемое разрежение (Па)</div>
        <div style={{display: 'flex'}}>
                                <input
                                    type="radio"
                                    id="stp17"
                                    name="subStep"
                                    value="Остаточное давление вентилятора (Па)"
                                    checked={boiler.underpressure === "Остаточное давление вентилятора (Па)"}
                                    onChange={(e) => handleFieldChange(boilerNum, 'underpressure', e.target.value)}
                                />
                                Остаточное давление вентилятора (Па)
                            </div>
                            <br />
                            <div style={{display: 'flex'}}>
                                <input
                                    type="radio"
                                    id="stp07"
                                    name="subStep"
                                    value="Требуемое разрежение (Па)"
                                    checked={boiler.underpressure === "Требуемое разрежение (Па)"}
                                    onChange={(e) => handleFieldChange(boilerNum, 'underpressure', e.target.value)}
                                />
                                Требуемое разрежение (Па)
                            </div>
                            <br />
                            {(boiler.underpressure === 'Требуемое разрежение (Па)' || boiler.underpressure === 'Остаточное давление вентилятора (Па)') && (
                <div>
                    <span>Мин: <input type="text" style={{ width: '80px' }} value={boiler.pressureMin || ''} onChange={(e) => handleFieldChange(boilerNum, 'pressureMin', e.target.value)} /></span>
                    <span style={{ marginLeft: '20px' }}>Макс: <input type="text" style={{ width: '80px' }} value={boiler.pressureMax || ''} onChange={(e) => handleFieldChange(boilerNum, 'pressureMax', e.target.value)} /></span>
                   
                </div>
                            )}
         
          {errors[`pressureMin_${boilerNum}`] && <p className="error">{errors[`pressureMin_${boilerNum}`]}</p>}
          {errors[`pressureMax_${boilerNum}`] && <p className="error">{errors[`pressureMax_${boilerNum}`]}</p>}
        <br/>

        {/* Выход патрубка */}
          <div className='quest'>Выход дымоотводящего патрубка</div>
          <label>
          <input type="radio" name={`pipeBranch_${boilerNum}`} value="Вверх" checked={boiler.pipeBranch === "Вверх"} onChange={(e) => handleFieldChange(boilerNum, 'pipeBranch', e.target.value)} /> Вверх</label>
          <br/><label><input type="radio" name={`pipeBranch_${boilerNum}`} value="Вбок" checked={boiler.pipeBranch === "Вбок"} onChange={(e) => handleFieldChange(boilerNum, 'pipeBranch', e.target.value)} /> Вбок</label>
          {errors[`pipeBranch_${boilerNum}`] && <p className="error">{errors[`pipeBranch_${boilerNum}`]}</p>}
        <br/>

            {/* Подключение */}
            <div className='quest'>Подключение к котлу</div>
            <label>
                <input
                    type="radio"
                    name={`connect_${boilerNum}`}
                    value="Патрубок"
                    checked={boiler.connect === "Патрубок"}
                    onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)} />
                Патрубок
            </label>
            <br />
            <label>
                <input type="radio"
                    name={`connect_${boilerNum}`}
                    value="Фланец" checked={boiler.connect === "Фланец"}
                    onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)} />
                Фланец
            </label>
            {errors[`connect_${boilerNum}`] && <p className="error">{errors[`connect_${boilerNum}`]}</p>}
            <br />

            {/* Экономайзер */}
            <div className='quest'>Есть ли после котла экономайзер</div><br />

            <label>
                <input
                    type="radio"
                    name={`economizer_${boilerNum}`}
                    value="Да"
                    checked={boiler.economizer === "Да"}
                    onChange={(e) => handleFieldChange(boilerNum, 'economizer', e.target.value)} />
                Да
            </label>
            <br />
            <label><input type="radio" name={`economizer_${boilerNum}`} value="Нет" checked={boiler.economizer === "Нет"} onChange={(e) => handleFieldChange(boilerNum, 'economizer', e.target.value)} /> Нет</label>
            {errors[`economizer_${boilerNum}`] && <p className="error">{errors[`economizer_${boilerNum}`]}</p>}


        <br/>
        {/* Дымосос */}
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