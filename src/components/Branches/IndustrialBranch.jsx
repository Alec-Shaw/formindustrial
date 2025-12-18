import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step0 from '../Steps/Step0';
import Step1 from '../Steps/Step1';
import Step2 from '../Steps/Step2';
import Step3 from '../Steps/Step3';
import Step4 from '../Steps/Step4';
import Step5 from '../Steps/Step5';
import Step6 from '../Steps/Step6';
import Step7 from '../Steps/Step7';
import Step8 from '../Steps/Step8';
import Step77 from '../Steps/Step77';
//import Step8 from '../Steps/Step8';
//import Step9 from '../Steps/Step9';
//import Step10 from '../Steps/Step10';
function IndustrialBranch({ formData, updateFormData }) {
    const [currentStep, setCurrentStep] = useState('step1');
    const [history, setHistory] = useState(['step1']);  // История: push на onNext, pop на onBack
    const navigate = useNavigate();
    // Утилита для push в историю (избегаем дубликатов)
    const updateHistory = (newStep) => {
        setHistory(prev => {
            if (prev[prev.length - 1] === newStep) return prev;  // Нет петель
            return [...prev, newStep];
        });
    };

    const onNextWithHistory = (nextStep) => {
        return () => {
            setCurrentStep(nextStep);
            updateHistory(nextStep);
        };
    };

    const getNextStep = (defaultNext, conditionKey) => {
    return (currentAnswer = '') => {  
        let nextStep = defaultNext;
        if (conditionKey) {
            const answer = currentAnswer || formData[conditionKey] || '';
            console.log('getNextStep:', conditionKey, 'answer =', answer);  

            if (conditionKey === 'step5' && answer.includes('Разные котлы')) {
                nextStep = 'step77';  // Skip
            }
            // Для 'Все котлы одинаковые' — default 'step6'
            // Добавьте для step3/step4
        }

        setCurrentStep(nextStep);
        updateHistory(nextStep);
    };
};

    const handleBack = () => {
        setHistory(prev => {
            const newHistory = [...prev];
            newHistory.pop();  // Удаляем текущий
            const prevStep = newHistory[newHistory.length - 1] || 'step1';  // Fallback на начало
            setCurrentStep(prevStep);
            return newHistory;
        });
    };
    const handleSubmit = () => {
        // Объединение данных и отправка в Google Apps Script
        const formDataArray = Object.keys(formData)
            .filter(key => {
                // Исключаем технические ключи, которые не нужно отправлять в таблицу
                if (key === 'step3_image') return false;  // Не отправляем ключ изображения
                return formData[key] && formData[key].trim() !== '';  // Только заполненные
            })
            .map(key => ({
                step: key,
                answer: formData[key]
            }));
        fetch('https://script.google.com/macros/s/AKfycbwYadIeETU5f-Q1bqqaA5STWdFpC2tgMFJPmvevlQjkDLLIGaNxefwRA5CZeG0z_Mk5/exec', {
            method: 'POST',
            body: JSON.stringify(formDataArray)
        })
            .then(response => response.json())
            .then(result => {
                alert(result.message || 'Отправлено!');
                navigate('/complete'); // Или сброс
            })
            .catch(error => alert('Ошибка: ' + error.message));

    };
    const steps = {
        step0: <Step0 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step1')} />,
        step1: <Step1 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step2')} onBack={() => navigate('/')} />,
        step2: <Step2 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step3')} onBack={handleBack} />,
        step3: <Step3 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step4')} onBack={handleBack} />,
        step4: <Step4 formData={formData} updateFormData={updateFormData} onNext={onNextWithHistory('step5')} onBack={handleBack} />,
        step5: <Step5 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step6', 'step5')} onBack={handleBack} />,
        step6: <Step6 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step7', 'step6')} onBack={handleBack} />,
        step7: <Step7 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step8', 'step7')} onBack={handleBack} />,
        step8: <Step8 formData={formData} updateFormData={updateFormData} onNext={getNextStep('step77', 'step8')} onBack={handleBack} />,
        step77: <Step77 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={handleBack} />,
        // step8: <Step8 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step9')} onBack={() => setCurrentStep('step77')} />,
        // step9: <Step9 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step10')} onBack={() => setCurrentStep('step8')} />,
        // step10: <Step10 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={() => setCurrentStep('step9')} />
    };

    return (
        <div>

            {steps[currentStep]}
        </div>
    );
}
export default IndustrialBranch;