import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step0 from '../Steps/Step0';
import Step1 from '../Steps/Step1';
import Step2 from '../Steps/Step2';
import Step3 from '../Steps/Step3';
import Step7 from '../Steps/Step7';
//import Step8 from '../Steps/Step8';
//import Step9 from '../Steps/Step9';
//import Step10 from '../Steps/Step10';

function IndustrialBranch({ formData, updateFormData }) {
    const [currentStep, setCurrentStep] = useState('step1'); // Локальное состояние для ветки
    const navigate = useNavigate();

    const handleSubmit = () => {
        // Объединение данных и отправка в Google Apps Script
        const formDataArray = Object.keys(formData).map(key => ({
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
        step0: <Step0 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step1')} />,
        step1: <Step1 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step2')}  onBack={() => setCurrentStep('step0')}/>,
        step2: <Step2 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step3')} onBack={() => setCurrentStep('step2')} />,
        step3: <Step3 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step7')} onBack={() => setCurrentStep('step2')} />,
        step7: <Step7 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={() => setCurrentStep('step3')} />,
       // step8: <Step8 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step9')} onBack={() => setCurrentStep('step7')} />,
       // step9: <Step9 formData={formData} updateFormData={updateFormData} onNext={() => setCurrentStep('step10')} onBack={() => setCurrentStep('step8')} />,
       // step10: <Step10 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onBack={() => setCurrentStep('step9')} />
    };

    

    return (
        <div>
            <h3>Ветка "Промышленная"</h3>
            {steps[currentStep]}
        </div>
    );
}

export default IndustrialBranch;