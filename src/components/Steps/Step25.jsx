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

const Step25 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    // Определяем количество котлов из Step3 (парсим текст)
    const step3Text = formData.Количество_котлов_и_расположение_котлов_и_тип_несущей_башни || '';
    const numBoilers = parseInt(step3Text.match(/(\d+) кот/)?.[1] || 1, 10);

    // Локальное состояние для всех котлов
    const [boilerData, setBoilerData] = useState({});

    useEffect(() => {
        const data = {};
        for (let i = 1; i <= numBoilers; i++) {
            data[i] = {
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
                chimneyDiameterKnown: '',
                chimneyDiameterCheck: '',
                connect: '',
                // Step18 fields
                mainChoice: '',
                subChoice: '',
                customValue: '',
                selectedSubpoint: '',
                notMore: '',
                notLess: '',
                nokNotMore: '',
                nokNotLess: '',
            };
        }
        setBoilerData(data);
    }, [numBoilers]);

    const handleFieldChange = (boilerNum, field, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], [field]: value },
        }));
        updateFormData({ [`Котел${boilerNum}_${field}`]: value });
        clearError(`${field}_${boilerNum}`);
    };

    // Блок логики высоты для каждого котла
    const handleMainChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: {
                ...prev[boilerNum],
                mainChoice: value,
                subChoice: '',
                customValue: '',
                selectedSubpoint: '',
                notMore: '',
                notLess: '',
                nokNotMore: '',
                nokNotLess: '',
            },
        }));
        updateFormData({ [`Котел${boilerNum}_mainChoiceHeight`]: value });
        clearError(`mainChoice_${boilerNum}`);
        clearError(`subChoice_${boilerNum}`);
        clearError(`customValue_${boilerNum}`);
        clearError(`selectedSubpoint_${boilerNum}`);
        clearError(`notMore_${boilerNum}`);
        clearError(`notLess_${boilerNum}`);
        clearError(`nokNotMore_${boilerNum}`);
        clearError(`nokNotLess_${boilerNum}`);
    };

    const handleSubChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], subChoice: value },
        }));
        updateFormData({ [`Котел${boilerNum}_subChoiceHeight`]: value });
        clearError(`subChoice_${boilerNum}`);
    };

    const handleCustomValueChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], customValue: value },
        }));
        updateFormData({ [`Котел${boilerNum}_customHeight`]: value });
        clearError(`customValue_${boilerNum}`);
    };

    const handleSelectedSubpointChange = (boilerNum, value) => {
        setBoilerData(prev => {
            const old = prev[boilerNum] || {};
            return {
                ...prev,
                [boilerNum]: {
                    ...old,
                    selectedSubpoint: value,
                    ...(value !== '1' ? { notMore: '', notLess: '' } : {}),
                    ...(value !== '2' ? { nokNotMore: '', nokNotLess: '' } : {}),
                },
            };
        });
        updateFormData({ [`Котел${boilerNum}_selectedSubpointHeight`]: value });
        clearError(`selectedSubpoint_${boilerNum}`);
    };

    const handleNotMoreChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], notMore: value },
        }));
        updateFormData({ [`Котел${boilerNum}_notMoreHeight`]: value });
        clearError(`notMore_${boilerNum}`);
    };

    const handleNotLessChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], notLess: value },
        }));
        updateFormData({ [`Котел${boilerNum}_notLessHeight`]: value });
        clearError(`notLess_${boilerNum}`);
    };

    const handleNokNotMoreChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], nokNotMore: value },
        }));
        updateFormData({ [`Котел${boilerNum}_nokNotMoreHeight`]: value });
        clearError(`nokNotMore_${boilerNum}`);
    };

    const handleNokNotLessChange = (boilerNum, value) => {
        setBoilerData(prev => ({
            ...prev,
            [boilerNum]: { ...prev[boilerNum], nokNotLess: value },
        }));
        updateFormData({ [`Котел${boilerNum}_nokNotLessHeight`]: value });
        clearError(`nokNotLess_${boilerNum}`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const fields = {};
        for (let i = 1; i <= numBoilers; i++) {
            const b = boilerData[i] || {};
            fields[`diametrPipeBranch_${i}`] = b.diametrPipeBranch;
            fields[`diametrPipeBranch_${i}_rules`] = { required: true };
            fields[`heightPipeBranch_${i}`] = b.heightPipeBranch;
            fields[`heightPipeBranch_${i}_rules`] = { required: true };
            fields[`boilerToTower_${i}`] = b.boilerToTower;
            fields[`boilerToTower_${i}_rules`] = { required: true };
            fields[`sideTowerA_${i}`] = b.sideTowerA;
            fields[`sideTowerA_${i}_rules`] = { required: true };
            fields[`towerOffsetB_${i}`] = b.towerOffsetB;
            fields[`towerOffsetB_${i}_rules`] = { required: true };
            fields[`insulation_${i}`] = b.insulation;
            fields[`insulation_${i}_rules`] = { required: true };
            fields[`distance_${i}`] = b.distance;
            fields[`distance_${i}_rules`] = { required: true };
            fields[`distanceAxis_${i}`] = b.distanceAxis;
            fields[`distanceAxis_${i}_rules`] = { required: true };
            
            if (b.distanceAxis !== "Принять по оси башни, т.е. K=0" && b.distanceAxis === 'Точно') {
            fields[`distanceAxisPrecisely_${i}`] = b.distanceAxisPrecisely;
            fields[`distanceAxisPrecisely_${i}_rules`] = { required: true };
            b.distanceAxisAbout = '';
        }

        if (b.distanceAxis !== "Принять по оси башни, т.е. K=0" && b.distanceAxis === 'Примерно') {
            fields[`distanceAxisAbout_${i}`] = b.distanceAxisAbout;
            fields[`distanceAxisAbout_${i}_rules`] = { required: true };
            b.distanceAxisPrecisely = '';
        }

        if (b.distanceAxis === "Принять по оси башни, т.е. K=0") {
            b.distanceAxisPrecisely = '';
            b.distanceAxisAbout = '';
        }

            fields[`distanceSurface_${i}`] = b.distanceSurface;
            fields[`distanceSurface_${i}_rules`] = { required: true };    
            
             if (b.distanceSurface === "Другое значение") {
                fields[`distanceConnect_${i}`] = b.distanceConnect;
                fields[`distanceConnect_${i}_rules`] = { required: true };
             }
            
            if (numBoilers !== 1) {
                fields[`distanceBoiler_${i}`] = b.distanceBoiler;
                fields[`distanceBoiler_${i}_rules`] = { required: true };
            }
            
            fields[`wall_${i}`] = b.wall;
            fields[`wall_${i}_rules`] = { required: true };
           
            fields[`chimneyDiameter_${i}`] = b.chimneyDiameter;
            fields[`chimneyDiameter_${i}_rules`] = { required: true };
            
            if (b.chimneyDiameter !== "Определить АЭ" && b.chimneyDiameter === "Известен") {
               fields[`chimneyDiameterKnown_${i}`] = b.chimneyDiameterKnown;
               fields[`chimneyDiameterKnown_${i}_rules`] = { required: true };
               b.chimneyDiameterCheck = '';
            }
            
            if (b.chimneyDiameter !== "Определить АЭ" && b.chimneyDiameter === "Известен перепроверить АЭ") {
               fields[`chimneyDiameterCheck_${i}`] = b.chimneyDiameterCheck;
               fields[`chimneyDiameterCheck_${i}_rules`] = { required: true };
               b.chimneyDiameterKnown = '';
            }
            
            if (b.chimneyDiameter === "Определить АЭ") {
               b.chimneyDiameterKnown = '';
               b.chimneyDiameterCheck = '';
            }

            fields[`connect_${i}`] = b.connect;
            fields[`connect_${i}_rules`] = { required: true };
            
            fields[`mainChoice_${i}`] = b.mainChoice;
            fields[`mainChoice_${i}_rules`] = { required: true };
            if (
                b.mainChoice === 'Известна, строго определенная' ||
                b.mainChoice === 'Есть высота нужно перепроверить'
            ) {
                fields[`subChoice_${i}`] = b.subChoice;
                fields[`subChoice_${i}_rules`] = { required: true };
                fields[`customValue_${i}`] = b.customValue;
                fields[`customValue_${i}_rules`] = { required: true };
            }
            
            if (b.mainChoice === 'Нужно определить требуемую высоту АЭ') {
                fields[`selectedSubpoint_${i}`] = b.selectedSubpoint;
                fields[`selectedSubpoint_${i}_rules`] = { required: true };
                if (b.selectedSubpoint === '1') {
                    fields[`notMore_${i}`] = b.notMore;
                    fields[`notMore_${i}_rules`] = { required: true, number: true };
                    fields[`notLess_${i}`] = b.notLess;
                    fields[`notLess_${i}_rules`] = { required: true, number: true };
                } else if (b.selectedSubpoint === '2') {
                    fields[`nokNotMore_${i}`] = b.nokNotMore;
                    fields[`nokNotMore_${i}_rules`] = { required: true, number: true };
                    fields[`nokNotLess_${i}`] = b.nokNotLess;
                    fields[`nokNotLess_${i}_rules`] = { required: true, number: true };
                }
                // Для 3 — только selectedSubpoint, без inputs
            }
        }
        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();
    };

    // Карта картинок
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
    const selectedImageSrc = formData.step3_image
        ? imageMap[formData.step3_image]
        : null;

    const renderBoilerForm = boilerNum => {
        const boiler = boilerData[boilerNum] || {};
        return (
            <div key={boilerNum} style={{display: 'flex', justifyContent: 'space-between', border: '1px solid #ccc', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
                <div>
                    <div className='quest'>Котел {boilerNum}</div>
                    <br />
                    <label>
                        <span className='table_boiler'>Диаметр дымоотводящего патрубка (dk), мм</span>
                        <input
                            className='width_lable'
                            type="text"
                            placeholder="(dk), мм"
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
                            placeholder="(M), мм"
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
                            placeholder="(A), мм"
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
                            placeholder="(P), мм"
                            value={boiler.distance || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'distance', e.target.value)}
                        />
                    </label>
                    {errors[`distance_${boilerNum}`] && <p className="error">{errors[`distance_${boilerNum}`]}</p>}
                    <br />

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
                    {errors[`distanceBoiler_${boilerNum}`] && <p className="error">{errors[`distanceBoiler_${boilerNum}`]}</p>}
                    <br />
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
                    {errors[`inAngle30_${boilerNum}`] && <p className="error">{errors[`inAngle30_${boilerNum}`]}</p>}
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
                    {errors[`inAngle45_${boilerNum}`] && <p className="error">{errors[`inAngle45_${boilerNum}`]}</p>}
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
                    {errors[`inAngle90_${boilerNum}`] && <p className="error">{errors[`inAngle90_${boilerNum}`]}</p>}
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
                    {errors[`outAngle30_${boilerNum}`] && <p className="error">{errors[`outAngle30_${boilerNum}`]}</p>}
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
                    {errors[`outAngle45_${boilerNum}`] && <p className="error">{errors[`outAngle45_${boilerNum}`]}</p>}
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
                    {errors[`outAngle90_${boilerNum}`] && <p className="error">{errors[`outAngle90_${boilerNum}`]}</p>}
                    <br />
                    
                    {/* Диаметр дымохода */}

                    <div className="radio">
                    <div className='table_boiler'>Диаметр дымохода (Котел {boilerNum})</div>

                    <div>
                        
                        <label>
                        <input
                            type="radio"
                            name={`chimneyDiameter_${boilerNum}`}
                            value="Известен"
                            checked={boiler.chimneyDiameter === "Известен"}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameter', e.target.value)}
                        />
                        Известен
                    </label>
                    {(boiler.chimneyDiameter === "Известен") && (<div style={{marginLeft: "20px", marginBottom:"20px"}}>
                    <input
                            className='width_lable'
                            type="text"
                            placeholder="(K), мм"
                            value={ boiler.chimneyDiameterKnown  || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameterKnown', e.target.value)}
                        />
                          {errors[`chimneyDiameterKnown_${boilerNum}`] && <p className="error">{errors[`chimneyDiameterKnown_${boilerNum}`]}</p>}
                        </div>)}
                    <label>
                        <input
                            type="radio"
                            name={`chimneyDiameter_${boilerNum}`}
                            value="Известен перепроверить АЭ"
                            checked={boiler.chimneyDiameter === "Известен перепроверить АЭ"}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameter', e.target.value)}
                        />
                        Известен перепроверить АЭ
                    </label>
                    {(boiler.chimneyDiameter === "Известен перепроверить АЭ") && (<div style={{marginLeft: "20px", marginBottom:"20px"}}>
                    <input
                            className='width_lable'
                            type="text"
                            placeholder="(K), мм"
                            value={boiler.chimneyDiameterCheck  || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameterCheck', e.target.value)}
                        />
                          {errors[`chimneyDiameterCheck_${boilerNum}`] && <p className="error">{errors[`chimneyDiameterCheck_${boilerNum}`]}</p>}
                        </div>)}
                    <label>
                        <input
                            type="radio"
                            name={`chimneyDiameter_${boilerNum}`}
                            value="Определить АЭ"
                            checked={boiler.chimneyDiameter === "Определить АЭ"}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameter', e.target.value)}
                        />
                        Определить АЭ
                    </label>
                    </div>
                 </div>
                    
                    {/* <label>
                        <span className='table_boiler'>Известен</span>
                        <input
                            className='width_lable'
                            type="text"
                            placeholder="диаметр"
                            value={boiler.chimneyDiameter || ''}
                            onChange={(e) => handleFieldChange(boilerNum, 'chimneyDiameter', e.target.value)}
                        />
                    </label> */}

                    {errors[`chimneyDiameter_${boilerNum}`] && <p className="error">{errors[`chimneyDiameter_${boilerNum}`]}</p>}
                    <br />
                    <div className='quest'>Высота при прочерчивании (Котел {boilerNum})</div>
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
                    <br />
                    {/* Высота АЭ блок (из Step18) */}
                    <div className='quest'>Высота АЭ (Котел {boilerNum})</div>
                    {/* 1. Известна, строго определенная */}
                    <div className="img_choos">
                        <div style={{ display: 'flex' }}>
                            <input
                                type="radio"
                                name={`height_main_${boilerNum}`}
                                value="Известна, строго определенная"
                                checked={boiler.mainChoice === 'Известна, строго определенная'}
                                onChange={e => handleMainChange(boilerNum, e.target.value)}
                            />
                            Известна, строго определенная
                        </div>
                        {boiler.mainChoice === 'Известна, строго определенная' && (
                            <div style={{ marginLeft: '30px' }}>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="radio"
                                        name={`height_sub_${boilerNum}`}
                                        value="Нок"
                                        checked={boiler.subChoice === 'Нок'}
                                        onChange={e => handleSubChange(boilerNum, e.target.value)}
                                    />
                                    Нок (от котла)
                                </div>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="radio"
                                        name={`height_sub_${boilerNum}`}
                                        value="Нз"
                                        checked={boiler.subChoice === 'Нз'}
                                        onChange={e => handleSubChange(boilerNum, e.target.value)}
                                    />
                                    Нз (от земли)
                                </div>
                                <br />
                                {(boiler.subChoice === 'Нок' || boiler.subChoice === 'Нз') && (
                                    <input
                                        type="text"
                                        placeholder={`Заполните ${boiler.subChoice}`}
                                        value={boiler.customValue || ''}
                                        onChange={e => handleCustomValueChange(boilerNum, e.target.value)}
                                        style={{ marginLeft: '10px', display: 'block' }}
                                    />
                                )}
                                {errors[`subChoice_${boilerNum}`] && <p className="error">{errors[`subChoice_${boilerNum}`]}</p>}
                                {errors[`customValue_${boilerNum}`] && <p className="error">{errors[`customValue_${boilerNum}`]}</p>}
                            </div>
                        )}
                    </div>
                    <br />
                    {/* 2. Есть высота нужно перепроверить */}
                    <div className="img_choos">
                        <div style={{ display: 'flex' }}>
                            <input
                                type="radio"
                                name={`height_main_${boilerNum}`}
                                value="Есть высота нужно перепроверить"
                                checked={boiler.mainChoice === 'Есть высота нужно перепроверить'}
                                onChange={e => handleMainChange(boilerNum, e.target.value)}
                            />
                            Есть высота нужно перепроверить
                        </div>
                        {boiler.mainChoice === 'Есть высота нужно перепроверить' && (
                            <div style={{ marginLeft: '30px' }}>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="radio"
                                        name={`height_sub_${boilerNum}`}
                                        value="Нок"
                                        checked={boiler.subChoice === 'Нок'}
                                        onChange={e => handleSubChange(boilerNum, e.target.value)}
                                    />
                                    Нок (от котла)
                                </div>
                                <br />
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="radio"
                                        name={`height_sub_${boilerNum}`}
                                        value="Нз"
                                        checked={boiler.subChoice === 'Нз'}
                                        onChange={e => handleSubChange(boilerNum, e.target.value)}
                                    />
                                    Нз (от земли)
                                </div>
                                <br />
                                {(boiler.subChoice === 'Нок' || boiler.subChoice === 'Нз') && (
                                    <input
                                        type="text"
                                        placeholder={`Заполните ${boiler.subChoice}`}
                                        value={boiler.customValue || ''}
                                        onChange={e => handleCustomValueChange(boilerNum, e.target.value)}
                                        style={{ marginLeft: '10px', display: 'block' }}
                                    />
                                )}
                                {errors[`subChoice_${boilerNum}`] && <p className="error">{errors[`subChoice_${boilerNum}`]}</p>}
                                {errors[`customValue_${boilerNum}`] && <p className="error">{errors[`customValue_${boilerNum}`]}</p>}
                            </div>
                        )}
                    </div>
                    <br />
                    {/* 3. Нужно определить требуемую высоту АЭ */}
                    <div className="img_choos">
                        <div style={{ display: 'flex' }}>
                            <input
                                type="radio"
                                name={`height_main_${boilerNum}`}
                                value="Нужно определить требуемую высоту АЭ"
                                checked={boiler.mainChoice === 'Нужно определить требуемую высоту АЭ'}
                                onChange={e => handleMainChange(boilerNum, e.target.value)}
                            />
                            Нужно определить требуемую высоту АЭ
                        </div>
                        {boiler.mainChoice === 'Нужно определить требуемую высоту АЭ' && (
                            <div style={{ marginLeft: '30px' }}>
                                <br />
                                {/* подпункт 1 */}
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="radio"
                                        name={`height_subpoint_${boilerNum}`}
                                        value="1"
                                        checked={boiler.selectedSubpoint === '1'}
                                        onChange={e => handleSelectedSubpointChange(boilerNum, e.target.value)}
                                    />
                                    не более
                                    <input
                                        type="text"
                                        placeholder="не более"
                                        value={boiler.notMore || ''}
                                        onChange={e => handleNotMoreChange(boilerNum, e.target.value)}
                                        style={{ margin: '0 5px' }}
                                    />
                                    не менее
                                    <input
                                        type="text"
                                        placeholder="не менее"
                                        value={boiler.notLess || ''}
                                        onChange={e => handleNotLessChange(boilerNum, e.target.value)}
                                        style={{ margin: '0 5px' }}
                                    />
                                </div>
                                {errors[`notMore_${boilerNum}`] && <p className="error">{errors[`notMore_${boilerNum}`]}</p>}
                                {errors[`notLess_${boilerNum}`] && <p className="error">{errors[`notLess_${boilerNum}`]}</p>}
                                <br />
                                {/* подпункт 2 */}
                                <div>
                                    <input
                                        type="radio"
                                        name={`height_subpoint_${boilerNum}`}
                                        value="2"
                                        checked={boiler.selectedSubpoint === '2'}
                                        onChange={e => handleSelectedSubpointChange(boilerNum, e.target.value)}
                                    />
                                    Нок не более
                                    <input
                                        type="text"
                                        placeholder="не более"
                                        value={boiler.nokNotMore || ''}
                                        onChange={e => handleNokNotMoreChange(boilerNum, e.target.value)}
                                        style={{ margin: '0 5px' }}
                                    />
                                    не менее
                                    <input
                                        type="text"
                                        placeholder="не менее"
                                        value={boiler.nokNotLess || ''}
                                        onChange={e => handleNokNotLessChange(boilerNum, e.target.value)}
                                        style={{ margin: '0 5px' }}
                                    />
                                </div>
                                {errors[`nokNotMore_${boilerNum}`] && <p className="error">{errors[`nokNotMore_${boilerNum}`]}</p>}
                                {errors[`nokNotLess_${boilerNum}`] && <p className="error">{errors[`nokNotLess_${boilerNum}`]}</p>}
                                <br />
                                {/* подпункт 3 */}
                                <div>
                                    <input
                                        type="radio"
                                        name={`height_subpoint_${boilerNum}`}
                                        value="3"
                                        checked={boiler.selectedSubpoint === '3'}
                                        onChange={e => handleSelectedSubpointChange(boilerNum, e.target.value)}
                                    />
                                    Выбрать min при диаметре выхода котла
                                </div>
                                {errors[`selectedSubpoint_${boilerNum}`] && <p className="error">{errors[`selectedSubpoint_${boilerNum}`]}</p>}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {/* Displaying the selected image from step 3 */}
                    {selectedImageSrc ? (
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
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

export default Step25;