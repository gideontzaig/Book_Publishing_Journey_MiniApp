// Book Publishing Journey Wizard
class BookPublishingWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.selections = {
            userType: null,
            genre: null,
            publishingProcess: null,
            budget: null
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
    }
    
    bindEvents() {
        // Next button
        const nextBtn = document.getElementById('next-btn');
        nextBtn.addEventListener('click', () => this.nextStep());
        
        // Back button
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => this.previousStep());
        
        // Close button
        const closeBtn = document.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        // Card selections for steps 1-3
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardSelection(e));
        });
        
        // Budget selections for step 4
        const budgetOptions = document.querySelectorAll('.budget-option');
        budgetOptions.forEach(option => {
            option.addEventListener('click', (e) => this.handleBudgetSelection(e));
        });
        
        // Radio button selections for step 4
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => this.handleRadioSelection(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    handleCardSelection(e) {
        const card = e.currentTarget;
        const step = parseInt(card.closest('.step').dataset.step);
        
        // Only handle if it's the current step
        if (step !== this.currentStep) return;
        
        // Remove selection from other cards in the same step
        const stepElement = card.closest('.step');
        const siblingCards = stepElement.querySelectorAll('.card');
        siblingCards.forEach(sibling => sibling.classList.remove('selected'));
        
        // Add selection to clicked card
        card.classList.add('selected');
        
        // Store selection
        const value = card.dataset.value;
        this.storeSelection(step, value);
        
        // Update UI
        this.updateUI();
    }
    
    handleBudgetSelection(e) {
        const option = e.currentTarget;
        
        // Only handle if we're on step 4
        if (this.currentStep !== 4) return;
        
        // Remove selection from other options
        const siblingOptions = document.querySelectorAll('.budget-option');
        siblingOptions.forEach(sibling => sibling.classList.remove('selected'));
        
        // Add selection to clicked option
        option.classList.add('selected');
        
        // Select the radio button
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
        
        // Store selection
        const value = option.dataset.value;
        this.selections.budget = value;
        
        // Update UI
        this.updateUI();
    }
    
    handleRadioSelection(e) {
        const radio = e.currentTarget;
        const option = radio.closest('.budget-option');
        
        // Update visual selection
        const siblingOptions = document.querySelectorAll('.budget-option');
        siblingOptions.forEach(sibling => sibling.classList.remove('selected'));
        option.classList.add('selected');
        
        // Store selection
        this.selections.budget = radio.value;
        
        // Update UI
        this.updateUI();
    }
    
    storeSelection(step, value) {
        switch (step) {
            case 1:
                this.selections.userType = value;
                break;
            case 2:
                this.selections.genre = value;
                break;
            case 3:
                this.selections.publishingProcess = value;
                break;
            case 4:
                this.selections.budget = value;
                break;
        }
    }
    
    nextStep() {
        if (!this.canProceed()) return;
        
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateUI();
            this.updateProgress();
            this.updateSubtitle();
        } else {
            // Completed all steps - show notification and handle completion
            this.completeWizard();
        }
    }
    
    completeWizard() {
        // First, fill progress bar to 100%
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = '100%';
        
        // Wait for progress animation, then show alert
        setTimeout(() => {
            alert('Thank you for completing your book publishing journey!\n\nWe\'ll be in touch soon with personalized recommendations.');
            
            // Log the final selections
            console.log('Wizard completed with selections:', this.selections);
        }, 300); // Small delay to see the progress complete
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateUI();
            this.updateProgress();
            this.updateSubtitle();
        }
    }
    
    showStep(stepNumber) {
        // Hide all steps
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        const currentStepElement = document.querySelector(`.step-${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
    }
    
    updateUI() {
        // Update step indicator
        const stepIndicator = document.getElementById('step-indicator');
        stepIndicator.textContent = `STEP ${this.currentStep} OF ${this.totalSteps}`;
        
        // Update back button visibility
        const backBtn = document.getElementById('back-btn');
        if (this.currentStep === 1) {
            backBtn.style.display = 'none';
        } else {
            backBtn.style.display = 'flex';
        }
        
        // Update next button state
        const nextBtn = document.getElementById('next-btn');
        nextBtn.disabled = !this.canProceed();
        
        // Update next button text for last step
        if (this.currentStep === this.totalSteps) {
            nextBtn.textContent = 'Next →';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        let progressPercentage;
        
        if (this.currentStep === 1) {
            progressPercentage = 0;
        } else {
            progressPercentage = ((this.currentStep - 1) / this.totalSteps) * 100;
        }
        
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    updateSubtitle() {
        const subtitle = document.getElementById('step-subtitle');
        const subtitles = {
            1: 'How would you describe yourself?',
            2: 'What genre is your book?',
            3: 'Where are you in the publishing process?',
            4: 'Choose your estimated budget'
        };
        
        subtitle.textContent = subtitles[this.currentStep];
    }
    
    canProceed() {
        switch (this.currentStep) {
            case 1:
                return this.selections.userType !== null;
            case 2:
                return this.selections.genre !== null;
            case 3:
                return this.selections.publishingProcess !== null;
            case 4:
                return this.selections.budget !== null;
            default:
                return false;
        }
    }
    
    handleKeyboard(e) {
        // ESC to close modal
        if (e.key === 'Escape') {
            this.closeModal();
        }
        
        // Enter to proceed if possible
        if (e.key === 'Enter' && this.canProceed()) {
            this.nextStep();
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' && this.currentStep > 1) {
            this.previousStep();
        }
        
        if (e.key === 'ArrowRight' && this.canProceed() && this.currentStep < this.totalSteps) {
            this.nextStep();
        }
    }
    
    closeModal() {
        // In a real app, this might close the modal or navigate away
        console.log('Modal close requested');
        console.log('Current selections:', this.selections);
    }
    
    // Method to restore selections when navigating back
    restoreSelections() {
        // Restore Step 1 selection
        if (this.selections.userType) {
            const userTypeCard = document.querySelector(`[data-value="${this.selections.userType}"]`);
            if (userTypeCard && userTypeCard.closest('.step-1')) {
                userTypeCard.classList.add('selected');
            }
        }
        
        // Restore Step 2 selection
        if (this.selections.genre) {
            const genreCard = document.querySelector(`[data-value="${this.selections.genre}"]`);
            if (genreCard && genreCard.closest('.step-2')) {
                genreCard.classList.add('selected');
            }
        }
        
        // Restore Step 3 selection
        if (this.selections.publishingProcess) {
            const processCard = document.querySelector(`[data-value="${this.selections.publishingProcess}"]`);
            if (processCard && processCard.closest('.step-3')) {
                processCard.classList.add('selected');
            }
        }
        
        // Restore Step 4 selection
        if (this.selections.budget) {
            const budgetOption = document.querySelector(`[data-value="${this.selections.budget}"]`);
            const budgetRadio = document.querySelector(`input[value="${this.selections.budget}"]`);
            
            if (budgetOption) {
                budgetOption.classList.add('selected');
            }
            
            if (budgetRadio) {
                budgetRadio.checked = true;
            }
        }
    }
    
    // Public method to get current state
    getSelections() {
        return { ...this.selections };
    }
    
    // Public method to get current step
    getCurrentStep() {
        return this.currentStep;
    }
}

// Initialize the wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bookWizard = new BookPublishingWizard();
});