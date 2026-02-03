import React, { useState, useEffect } from 'react'; 
import { useFormValidation } from '../hooks/useFormValidation';  
import img1 from '../../img/1.jpg';  
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';
import img12 from '../../img/12.jpg';  
import img13 from '../../img/13.jpg';
import img14 from '../../img/14.jpg';
import img21 from '../../img/21.jpg';  
import img22 from '../../img/22.jpg';
import img23 from '../../img/23.jpg';
import img24 from '../../img/24.jpg';
import img31 from '../../img/31.jpg';  
import img32 from '../../img/32.jpg';
import img33 from '../../img/33.jpg';
import img41 from '../../img/41.jpg';  
import img42 from '../../img/42.jpg';
import img43 from '../../img/43.jpg';
import img_pic from '../../img/pic3.jpg';
import img_pic2 from '../../img/pic2.jpg';

const Step23 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    // Определяем количество котлов из Step3 (парсим текст)
    const step3Text = formData.Количество_котлов_и_расположение_котлов_и_тип_несущей_башни || '';
    const numBoilers = parseInt(step3Text.match(/(\d+) кот/)[1] || 1);  // "1 котел" -> 1, "2 котла" -> 2 и т.д.

    // Локальное состояние для всех котлов (объект {1: {diametrPipeBranch: ''}, 2: {...}})
    const [boilerData, setBoilerData] = useState({});  // Дефолт пустой

    // Инициализация для N котлов (useEffect, чтобы избежать infinite loop)
    useEffect(() => {
        const data = {};
        for (let i = 1; i <= numBoilers; i++) {
            data[i] = {
               // name: '',
               // fuelType: '',
                diametrPipeBranch: '',
                heightPipeBranch: '',
                boilerToTower: '',
                sideTowerA: '',
                towerOffsetB: '',
                insulation: '',
                distance: '',
                distanceAxis: '',
                distanceAxisPrecisely: '',
                distanceAxisAbout: '',
                distanceSurface: '',
                distanceConnect:'',
                distanceBoiler: '',
                wall: '',
                inAngle30: '',
                inAngle45: '',
                inAngle90: '',
                outAngle30: '',
                outAngle45: '',
                outAngle90: '',
                chimneyDiameter: '',
                connect: '',
              //  economizer: 'Нет',  
              //  dymosos: 'Нет',  
               // diameter: '',
               // height: '',
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
            
            // fields[`name_${i}`] = boiler.name;
            // fields[`name_${i}_rules`] = { required: true };

            // fields[`fuelType_${i}`] = boiler.fuelType;
            // fields[`fuelType_${i}_rules`] = { required: true };

           
            // if (boiler.fuelType === 'Свой вариант') {
            //     fields[`customFuel_${i}`] = boiler.customFuel;
            //     fields[`customFuel_${i}_rules`] = { required: true };
            // }

            fields[`diametrPipeBranch_${i}`] = boiler.diametrPipeBranch;
            fields[`diametrPipeBranch_${i}_rules`] = { required: true };

            fields[`heightPipeBranch_${i}`] = boiler.heightPipeBranch;
            fields[`heightPipeBranch_${i}_rules`] = { required: true };

            fields[`boilerToTower_${i}`] = boiler.boilerToTower;
            fields[`boilerToTower_${i}_rules`] = { required: true };

            fields[`sideTowerA_${i}`] = boiler.sideTowerA;
            fields[`sideTowerA_${i}_rules`] = { required: true };

            fields[`towerOffsetB_${i}`] = boiler.towerOffsetB;
            fields[`towerOffsetB_${i}_rules`] = { required: true };

             fields[`insulation_${i}`] = boiler.insulation;
             fields[`insulation_${i}_rules`] = { required: true };

             fields[`distance_${i}`] = boiler.distance;
             fields[`distance_${i}_rules`] = { required: true };

             fields[`distanceAxis_${i}`] = boiler.distanceAxis;
            fields[`distanceAxis_${i}_rules`] = { required: true };
            
            if (boiler.distanceAxis !== "Принять по оси башни, т.е. K=0" && boiler.distanceAxis === 'Точно') {
               fields[`distanceAxisPrecisely_${i}`] = boiler.distanceAxisPrecisely;
               fields[`distanceAxisPrecisely_${i}_rules`] = { required: true };
               boiler.distanceAxisAbout = '';
             }

            if (boiler.distanceAxis !== "Принять по оси башни, т.е. K=0" && boiler.distanceAxis === 'Примерно') {
               fields[`distanceAxisAbout_${i}`] = boiler.distanceAxisAbout;
               fields[`distanceAxisAbout_${i}_rules`] = { required: true };
               boiler.distanceAxisPrecisely = '';
            }

            if (boiler.distanceAxis === "Принять по оси башни, т.е. K=0") {
            boiler.distanceAxisPrecisely = '';
            boiler.distanceAxisAbout = '';
        }

             fields[`distanceSurface_${i}`] = boiler.distanceSurface;
             fields[`distanceSurface_${i}_rules`] = { required: true };
             
             if (boiler.distanceSurface === "Другое значение") {
                fields[`distanceConnect_${i}`] = boiler.distanceConnect;
                fields[`distanceConnect_${i}_rules`] = { required: true };
             }

             fields[`connect_${i}`] = boiler.connect;
             fields[`connect_${i}_rules`] = { required: true };

             fields[`wall_${i}`] = boiler.wall;
             fields[`wall_${i}_rules`] = { required: true };

             if (numBoilers !== 1) {
                fields[`distanceBoiler_${i}`] = boiler.distanceBoiler;
                fields[`distanceBoiler_${i}_rules`] = { required: true };
            }

            fields[`chimneyDiameter_${i}`] = boiler.chimneyDiameter;
            fields[`chimneyDiameter_${i}_rules`] = { required: true };

            // fields[`economizer_${i}`] = boiler.economizer;
            // fields[`economizer_${i}_rules`] = { required: true };

            // fields[`dymosos_${i}`] = boiler.dymosos;
            // fields[`dymosos_${i}_rules`] = { required: true };

            // fields[`diameter_${i}`] = boiler.diameter;
            // fields[`diameter_${i}_rules`] = { required: true, number: true };

            // fields[`height_${i}`] = boiler.height;
            // fields[`height_${i}_rules`] = { required: true, number: true };
        }

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }
        onNext();  
    };

    // Mapping keys to imports for image display
    const imageMap = {
        option1: img1,
        option2: img12,
        option3: img13,
        option4: img14,
        option5: img2,
        option6: img21,
        option7: img22,
        option8: img23,
        option9: img24,
        option10: img3,
        option11: img31,
        option12: img32,
        option13: img33,
        option14: img4,
        option15: img41,
        option16: img42,
        option17: img43,
    };

    // Get the src by key from formData.step3_image
    const selectedImageSrc = formData.step3_image ? imageMap[formData.step3_image] : null;

    // JSX: Цикл для N котлов
    const renderBoilerForm = (boilerNum) => {
        const boiler = boilerData[boilerNum] || {};
        return (
            <div key={boilerNum} style={{display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
            <div>
                <div className='quest'>Котел {boilerNum}</div>
                {/* <div className='quest'>Название котла</div>
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
                </div> */}
                <br />
                {/* <div className='quest'>Параметры теплогенератора (Котел {boilerNum})</div> */}
                <label>
                    <span className='table_boiler'>Диаметр дымоотводящего патрубка (dk)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="Мин/Макс"
                        value={boiler.diametrPipeBranch || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'diametrPipeBranch', e.target.value)}
                    />
                </label>
                {errors[`diametrPipeBranch_${boilerNum}`] && <p className="error">{errors[`diametrPipeBranch_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Высота дымоотводящего патрубка (hk), мм</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(hk), мм"
                        value={boiler.heightPipeBranch || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'heightPipeBranch', e.target.value)}
                    />
                </label>
                {errors[`heightPipeBranch_${boilerNum}`] && <p className="error">{errors[`heightPipeBranch_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>От котла до башни (М), мм</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(М), мм"
                        value={boiler.boilerToTower || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'boilerToTower', e.target.value)}
                    />
                </label>
                {errors[`boilerToTower_${boilerNum}`] && <p className="error">{errors[`boilerToTower_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Сторона башни по осям (А), мм</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(А), мм"
                        value={boiler.sideTowerA || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'sideTowerA', e.target.value)}
                    />
                </label>
                {errors[`sideTowerA_${boilerNum}`] && <p className="error">{errors[`sideTowerA_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Смещение башни относительно котла (B), мм</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(B), мм"
                        value={boiler.towerOffsetB || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'towerOffsetB', e.target.value)}
                    />
                </label>
                {errors[`towerOffsetB_${boilerNum}`] && <p className="error">{errors[`towerOffsetB_${boilerNum}`]}</p>}
                <br />
                <label>
                    <span className='table_boiler'>Расстояние в помещении (Р), мм</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(Р), мм"
                        value={boiler.distance || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'distance', e.target.value)}
                    />
                </label>
                {errors[`distance_${boilerNum}`] && <p className="error">{errors[`distance_${boilerNum}`]}</p>}
                <br />
                
                {/* Расстояние от оси стороны башни до поверхности присоединения консоли (К), мм */}

               <div className="radio">
                        <span className='table_boiler'>Расстояние от оси стороны башни до поверхности присоединения консоли (К), мм</span>
                        <div>
                        
                        <label>
                        <input
                            type="radio"
                            name={`distanceAxis_${boilerNum}`}
                            value="Точно"
                            checked={boiler.distanceAxis === "Точно"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceAxis', e.target.value)}
                        />
                        Точно
                    </label>
                    {(boiler.distanceAxis === "Точно") && (<div style={{marginLeft: "20px", marginBottom:"20px"}}>
                    <input
                            className='width_lable'
                            type="text"
                            placeholder="(K), мм"
                            value={boiler.distanceAxisPrecisely  || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceAxisPrecisely', e.target.value)}
                        />
                          {errors[`distanceAxisPrecisely_${boilerNum}`] && <p className="error">{errors[`distanceAxisPrecisely_${boilerNum}`]}</p>}
                        </div>)}
                    <label>
                        <input
                            type="radio"
                            name={`distanceAxis_${boilerNum}`}
                            value="Примерно"
                            checked={boiler.distanceAxis === "Примерно"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceAxis', e.target.value)}
                        />
                        Примерно
                    </label>
                    {(boiler.distanceAxis === "Примерно") && (<div style={{marginLeft: "20px", marginBottom:"20px"}}>
                    <input
                            className='width_lable'
                            type="text"
                            placeholder="(K), мм"
                            value={boiler.distanceAxisAbout  || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceAxisAbout', e.target.value)}
                        />
                          {errors[`distanceAxisAbout_${boilerNum}`] && <p className="error">{errors[`distanceAxisAbout_${boilerNum}`]}</p>}
                        </div>)}
                    <label>
                        <input
                            type="radio"
                            name={`distanceAxis_${boilerNum}`}
                            value="Принять по оси башни, т.е. K=0"
                            checked={boiler.distanceAxis === "Принять по оси башни, т.е. K=0"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceAxis', e.target.value)}
                        />
                        Принять по оси башни, т.е. K=0
                    </label>
                    </div>
                    
                    </div>
                    {errors[`distanceAxis_${boilerNum}`] && <p className="error">{errors[`distanceAxis_${boilerNum}`]}</p>}
                    <br />
                
                {/* Расстояние от поверхности присоединения консоли до края дымохода (Х), мм */}

                <div className="radio">
                    <span className='table_boiler'>Расстояние от поверхности присоединения консоли до края дымохода (Х), мм</span>
                    <div>
                    <label>
                    <input
                            type="radio"
                            name={`distanceSurface_${boilerNum}`}
                            value="Для Стен хомута принять 50"
                            checked={boiler.distanceSurface === "Для Стен хомута принять 50"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceSurface', e.target.value)}
                        />
                        Для "Стенового хомута" принять 50
                    </label>
                    <label>
                    <input
                            type="radio"
                            name={`distanceSurface_${boilerNum}`}
                            value="Для Крепления к стене принять 65"
                            checked={boiler.distanceSurface === "Для Крепления к стене принять 65"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceSurface', e.target.value)}
                        />
                        Для "Крепления к стене" принять 65
                    </label>
                    <label>
                    <input
                            type="radio"
                            name={`distanceSurface_${boilerNum}`}
                            value="Другое значение"
                            checked={boiler.distanceSurface === "Другое значение"}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceSurface', e.target.value)}
                        />
                        Другое значение
                    </label>
                    {(boiler.distanceSurface === "Другое значение") && (<div style={{marginLeft: "20px", marginBottom:"20px"}}>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="(X), мм"
                        value={boiler.distanceConnect || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'distanceConnect', e.target.value)}
                    />
                    {errors[`distanceConnect_${boilerNum}`] && <p className="error">{errors[`distanceConnect_${boilerNum}`]}</p>}
                    </div>)}
                    </div>
                </div>

                {errors[`distanceSurface_${boilerNum}`] && <p className="error">{errors[`distanceSurface_${boilerNum}`]}</p>}
                <br />

             {/* Расстояние между котлами (R), мм */}

                {(numBoilers !== 1) && (<label>
                        <span className='table_boiler'>Расстояние между котлами (R), мм</span>
                        <input
                            className='width_lable'
                            type="text"
                            placeholder="(R), мм"
                            value={boiler.distanceBoiler || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'distanceBoiler', e.target.value)}
                        />
                    </label>)}
                    <br/>
                <label>
                        <span className='table_boiler'>Толщина стены (T), мм</span>
                        <input
                            className='width_lable'
                            type="text"
                            placeholder="(T), мм"
                            value={boiler.wall || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'wall', e.target.value)}
                        />
                    </label>
                    {errors[`wall_${boilerNum}`] && <p className="error">{errors[`wall_${boilerNum}`]}</p>}
                    <br />
                <div className='quest'>Изоляция (Котел {boilerNum})</div>
                <label>
                    <input
                        type="radio"
                        name={`insulation_${boilerNum}`}
                        value="Да - 50 рекомендуемая"
                        checked={boiler.insulation === "Да - 50 рекомендуемая"}
                        onChange={(e) => handleFieldChange(boilerNum, 'insulation', e.target.value)}
                    />
                    Да - 50 рекомендуемая
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`insulation_${boilerNum}`}
                        value="Да - 25 в обоснованных случаях"
                        checked={boiler.insulation === "Да - 25 в обоснованных случаях"}
                        onChange={(e) => handleFieldChange(boilerNum, 'insulation', e.target.value)}
                    />
                    Да - 25 в обоснованных случаях
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`insulation_${boilerNum}`}
                        value="Нет"
                        checked={boiler.insulation === "Нет"}
                        onChange={(e) => handleFieldChange(boilerNum, 'insulation', e.target.value)}
                    />
                    Нет
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`insulation_${boilerNum}`}
                        value="В теплых 1 стен, в холодных 50"
                        checked={boiler.insulation === "В теплых 1 стен, в холодных 50"}
                        onChange={(e) => handleFieldChange(boilerNum, 'insulation', e.target.value)}
                    />
                    В теплых 1 стен, в холодных 50
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name={`insulation_${boilerNum}`}
                        value="В теплых 1 стен, в холодных 25"
                        checked={boiler.insulation === "В теплых 1 стен, в холодных 25"}
                        onChange={(e) => handleFieldChange(boilerNum, 'insulation', e.target.value)}
                    />
                    В теплых 1 стен, в холодных 25
                </label>
                {errors[`insulation_${boilerNum}`] && <p className="error">{errors[`insulation_${boilerNum}`]}</p>}
                <br />

                <div className='quest'>Количество поворотов в котельной (Котел {boilerNum})</div>
                <label>
                    <span className='table_boiler'>Угол 30° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.inAngle30 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'inAngle30', e.target.value)}
                    />
                </label>
                <br />
                <label>
                    <span className='table_boiler'>Угол 45° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.inAngle45 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'inAngle45', e.target.value)}
                    />
                </label>
                <br />
                <label>
                    <span className='table_boiler'>Угол 90° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.inAngle90 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'inAngle90', e.target.value)}
                    />
                </label>
                <br />
                <div className='quest'>Количество поворотов на улице (Котел {boilerNum})</div>
                <label>
                    <span className='table_boiler'>Угол 30° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.outAngle30 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'outAngle30', e.target.value)}
                    />
                </label>
                <br />
                <label>
                    <span className='table_boiler'>Угол 45° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.outAngle45 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'outAngle45', e.target.value)}
                    />
                </label>
                <br />
                <label>
                    <span className='table_boiler'>Угол 90° (шт)</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="шт"
                        value={boiler.outAngle90 || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'outAngle90', e.target.value)}
                    />
                </label>
                <br />

                {/* Диаметр дымохода */}

                
                 <div className='quest'>Диаметр дымохода (Котел {boilerNum})</div>

                 
                <label>
                    <span className='table_boiler'>Известен</span>
                    <input
                        className='width_lable'
                        type="text"
                        placeholder="диаметр, мм"
                        value={boiler.chimneyDiameter || ''}
                        onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameter', e.target.value)}
                    />
                </label>

                
                 {errors[`chimneyDiameter_${boilerNum}`] && <p className="error">{errors[`chimneyDiameter_${boilerNum}`]}</p>}
                 <br/>
                
                 <div className='quest'>Выстоа при прочерчивании</div>
                <label>
                    <input
                        type="radio"
                        name={`connect_${boilerNum}`}
                        value="Строго ограниченна (подогнать нестандартными элементами)"
                        checked={boiler.connect === "Строго ограниченна (подогнать нестандартными элементами)"}
                        onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)}
                    />
                    Строго ограниченна (подогнать нестандартными элементами)
                </label>
                
                <label>
                    <input
                        type="radio"
                        name={`connect_${boilerNum}`}
                        value="Сделать не менее (стандартными элементами)"
                        checked={boiler.connect === "Сделать не менее (стандартными элементами)"}
                        onChange={(e) => handleFieldChange(boilerNum, 'connect', e.target.value)}
                    />
                    Сделать не менее (стандартными элементами)
                </label>
                {errors[`connect_${boilerNum}`] && <p className="error">{errors[`connect_${boilerNum}`]}</p>}
                {/*<br />
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
                </label> */}
                {errors[`height_${boilerNum}`] && <p className="error">{errors[`height_${boilerNum}`]}</p>}
            </div>
            <div>
             {/* Displaying the selected image from step 3 */}
            {selectedImageSrc ? (
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    {/* <p>Выбранный вариант из шага 3:</p> */}
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img
                        src={selectedImageSrc}
                        alt="Выбранный вариант"
                        style={{ maxWidth: '300px',  border: '1px solid #ccc', borderRadius: '8px', marginRight: '30px', marginBottom:'20px' }}
                    />
                    <img alt='' 
                    src={img_pic} 
                    style={{ maxWidth: '300px',  border: '1px solid #ccc', borderRadius: '8px', marginBottom:'20px' }} />
                    <img alt='' 
                    src={img_pic2} 
                    style={{ maxWidth: '300px',  border: '1px solid #ccc', borderRadius: '8px', marginBottom:'20px' }} />
                   </div>
                </div>
            ) : (
                <p style={{ color: 'orange' }}>Изображение не выбрано (вернитесь к шагу 3).</p>
            )}
            </div>
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

export default Step23;