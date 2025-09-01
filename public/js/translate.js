// Sign Language Translation JavaScript
// Handles camera access, sign detection, and translation API calls
// Modified for REAL-TIME continuous translation

class SignLanguageTranslator {
    constructor() {
        this.video = document.getElementById('webcam');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // UI Elements
        this.startCameraBtn = document.getElementById('start-camera');
        this.startTranslateBtn = document.getElementById('start-translate');
        this.stopTranslateBtn = document.getElementById('stop-translate');
        this.detectedSignEl = document.getElementById('detected-sign');
        this.translationResultEl = document.getElementById('translation-result');
        this.confidenceLevelEl = document.getElementById('confidence-level');
        this.confidenceTextEl = document.getElementById('confidence-text');
        this.countdownEl = document.getElementById('countdown');
        this.recordingIndicatorEl = document.getElementById('recording-indicator');
        this.historyListEl = document.getElementById('history-list');
        
        // State
        this.isTranslating = false;
        this.mediaStream = null;
        this.translationInterval = null;
        this.frameBuffer = [];
        this.lastTranslation = null;
        this.lastTranslationTime = 0;
        this.selectedLanguage = 'en';
        this.translationCooldown = 1000; // 1 second cooldown between translations
        
        // Initialize
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupLanguageSelector();
    }
    
    bindEvents() {
        this.startCameraBtn.addEventListener('click', () => this.startCamera());
        this.startTranslateBtn.addEventListener('click', () => this.startTranslation());
        this.stopTranslateBtn.addEventListener('click', () => this.stopTranslation());
        
        // Language selection
        document.querySelectorAll('.lang-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectLanguage(e.target.textContent);
            });
        });
    }
    
    setupLanguageSelector() {
        // Create language selector if it doesn't exist
        if (!document.querySelector('.language-selector')) {
            const languageSelector = document.createElement('div');
            languageSelector.className = 'language-selector';
            languageSelector.innerHTML = `
                <label for="target-language">Target Language:</label>
                <select id="target-language">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="kn">Kannada</option>
                    <option value="te">Telugu</option>
                </select>
            `;
            
            // Insert after camera controls
            const cameraControls = document.querySelector('.camera-controls');
            if (cameraControls) {
                cameraControls.parentNode.insertBefore(languageSelector, cameraControls.nextSibling);
                
                // Bind language change event
                document.getElementById('target-language').addEventListener('change', (e) => {
                    this.selectedLanguage = e.target.value;
                });
            }
        }
    }
    
    async startCamera() {
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user',
                    frameRate: { ideal: 30 } // Higher frame rate for real-time
                }
            });
            
            this.video.srcObject = this.mediaStream;
            this.video.play();
            
            // Update UI
            this.startCameraBtn.disabled = true;
            this.startTranslateBtn.disabled = false;
            this.updateStatus('Camera started', 'success');
            
        } catch (error) {
            console.error('Error starting camera:', error);
            this.updateStatus('Failed to start camera', 'error');
        }
    }
    
    startTranslation() {
        if (!this.mediaStream) {
            this.updateStatus('Please start camera first', 'error');
            return;
        }
        
        this.isTranslating = true;
        this.frameBuffer = [];
        this.startTranslateBtn.style.display = 'none';
        this.stopTranslateBtn.style.display = 'inline-block';
        this.recordingIndicatorEl.style.display = 'block';
        
        // Start real-time translation
        this.startRealTimeTranslation();
        
        this.updateStatus('Real-time translation active', 'recording');
    }
    
    stopTranslation() {
        this.isTranslating = false;
        this.startTranslateBtn.style.display = 'inline-block';
        this.stopTranslateBtn.style.display = 'none';
        this.recordingIndicatorEl.style.display = 'none';
        
        if (this.translationInterval) {
            clearInterval(this.translationInterval);
            this.translationInterval = null;
        }
        
        this.updateStatus('Ready to translate', 'ready');
    }
    
    startRealTimeTranslation() {
        // Capture frames every 100ms for real-time processing
        this.translationInterval = setInterval(() => {
            if (!this.isTranslating) return;
            
            // Capture current frame
            this.captureFrame();
            
            // Process frame buffer when we have enough frames
            if (this.frameBuffer.length >= 10) {
                this.processRealTimeFrames();
            }
            
            // Keep buffer size manageable
            if (this.frameBuffer.length > 20) {
                this.frameBuffer.shift();
            }
        }, 100); // 10 FPS for real-time feel
    }
    
    captureFrame() {
        // Set canvas dimensions
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        
        // Draw video frame to canvas
        this.ctx.drawImage(this.video, 0, 0);
        
        // Convert to base64
        const frameData = this.canvas.toDataURL('image/jpeg', 0.7); // Lower quality for speed
        this.frameBuffer.push(frameData.split(',')[1]);
    }
    
    async processRealTimeFrames() {
        // Check cooldown to avoid spam
        const now = Date.now();
        if (now - this.lastTranslationTime < this.translationCooldown) {
            return;
        }
        
        try {
            // Use the most recent frames
            const recentFrames = this.frameBuffer.slice(-10);
            
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    frames: recentFrames,
                    language: this.selectedLanguage
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Only update if we have a meaningful result
            if (result.confidence > 0.3 && result.detected_sign !== 'unknown') {
                this.displayRealTimeResults(result);
                this.lastTranslationTime = now;
                this.lastTranslation = result;
            }
            
        } catch (error) {
            console.error('Real-time translation error:', error);
        }
    }
    
    displayRealTimeResults(result) {
        // Display detected sign
        if (this.detectedSignEl) {
            const gestureText = this.detectedSignEl.querySelector('.gesture-text');
            if (gestureText) {
                gestureText.textContent = result.detected_sign || 'Unknown';
            }
        }
        
        // Display confidence
        if (this.confidenceLevelEl && this.confidenceTextEl) {
            const confidence = Math.round(result.confidence * 100);
            this.confidenceLevelEl.style.width = `${confidence}%`;
            this.confidenceTextEl.textContent = `${confidence}%`;
        }
        
        // Display translation
        if (this.translationResultEl) {
            this.translationResultEl.textContent = result.translation || 'No translation available';
        }
        
        // Add to history if it's a new sign
        if (this.lastTranslation && 
            (this.lastTranslation.detected_sign !== result.detected_sign || 
             this.lastTranslation.translation !== result.translation)) {
            this.addToHistory(result);
        }
        
        // Update status with real-time feedback
        this.updateStatus(`Live: ${result.detected_sign} → ${result.translation}`, 'success');
    }
    
    addToHistory(result) {
        if (!this.historyListEl) return;
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-content">
                <div class="history-sign">${result.detected_sign}</div>
                <div class="history-translation">${result.translation}</div>
                <div class="history-language">${result.language}</div>
                <div class="history-confidence">${Math.round(result.confidence * 100)}%</div>
            </div>
            <div class="history-time">${new Date().toLocaleTimeString()}</div>
        `;
        
        // Remove empty state if it exists
        const emptyState = this.historyListEl.querySelector('.history-empty');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Add to beginning of list
        this.historyListEl.insertBefore(historyItem, this.historyListEl.firstChild);
        
        // Limit history to 10 items
        const items = this.historyListEl.querySelectorAll('.history-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
    }
    
    selectLanguage(languageText) {
        // Update active language indicator
        document.querySelectorAll('.lang-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find and activate the clicked language
        const languageMap = {
            'Hello': 'en',
            'नमस्ते': 'hi',
            'ನಮಸ್ಕಾರ': 'kn',
            'హలో': 'te'
        };
        
        this.selectedLanguage = languageMap[languageText] || 'en';
        
        // Update language selector if it exists
        const languageSelect = document.getElementById('target-language');
        if (languageSelect) {
            languageSelect.value = this.selectedLanguage;
        }
        
        // Update active state
        event.target.classList.add('active');
    }
    
    updateStatus(message, type) {
        const statusText = document.querySelector('.status-text');
        const statusDot = document.querySelector('.status-dot');
        
        if (statusText) {
            statusText.textContent = message;
        }
        
        if (statusDot) {
            statusDot.className = `status-dot ${type}`;
        }
        
        console.log(`Status: ${message} (${type})`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SignLanguageTranslator();
});
