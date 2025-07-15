// QR Dynamic - Settings JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    checkAuth();
});

// Check if user is authenticated
function checkAuth() {
    const isLoggedIn = localStorage.getItem('qr_dynamic_logged_in');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// Show specific settings section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId + '-section');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('active');
    }
    
    // Update navigation active state
    const navButtons = document.querySelectorAll('.sidebar-nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
}

// Logout function
function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('qr_dynamic_logged_in');
        localStorage.removeItem('qr_dynamic_user');
        window.location.href = 'login.html';
    }
}

// Handle settings form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Mock save - in a real app, this would call your backend
        console.log('Settings saved:', data);
        showNotification('Configurações salvas com sucesso!', 'success');
    }
});

// Handle checkbox changes
document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"]')) {
        const setting = e.target.name || e.target.id;
        const value = e.target.checked;
        
        // Mock save - in a real app, this would call your backend
        console.log('Setting changed:', setting, value);
        showNotification('Configuração atualizada!', 'success');
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-success text-primary-foreground' : 
        type === 'error' ? 'bg-destructive text-destructive-foreground' : 
        'bg-primary text-primary-foreground'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export data function
function exportData() {
    const data = {
        qrCodes: JSON.parse(localStorage.getItem('qr_dynamic_codes') || '[]'),
        settings: JSON.parse(localStorage.getItem('qr_dynamic_settings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-dynamic-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Backup exportado com sucesso!', 'success');
}

// Import data function
function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.qrCodes) {
                localStorage.setItem('qr_dynamic_codes', JSON.stringify(data.qrCodes));
            }
            
            if (data.settings) {
                localStorage.setItem('qr_dynamic_settings', JSON.stringify(data.settings));
            }
            
            showNotification('Backup importado com sucesso!', 'success');
        } catch (error) {
            showNotification('Erro ao importar backup. Arquivo inválido.', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Add export/import functionality to backup section
document.addEventListener('DOMContentLoaded', function() {
    const backupSection = document.getElementById('backup-section');
    if (backupSection) {
        backupSection.innerHTML = `
            <h2 class="text-3xl font-bold text-foreground mb-2">Backup e Exportação</h2>
            <p class="text-muted-foreground mb-8">Configure backups automáticos e exportação de dados.</p>
            
            <div class="space-y-6">
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4">Exportar Dados</h3>
                    <p class="text-muted-foreground mb-4">Faça download de todos os seus dados em formato JSON.</p>
                    <button onclick="exportData()" class="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md font-medium transition-colors">
                        Exportar Backup
                    </button>
                </div>
                
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4">Importar Dados</h3>
                    <p class="text-muted-foreground mb-4">Restaure seus dados a partir de um arquivo de backup.</p>
                    <input type="file" accept=".json" onchange="importData(this)" class="w-full px-3 py-2 bg-background border border-input rounded-md">
                </div>
                
                <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <h3 class="text-lg font-semibold mb-4">Backup Automático</h3>
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="form-checkbox" name="auto-backup">
                        <span>Ativar backup automático diário</span>
                    </label>
                </div>
            </div>
        `;
    }
});