// QR Dynamic - Dashboard JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    loadQRCodes();
});

// Mock data for QR codes
let qrCodes = [
    {
        id: '1',
        name: 'Site Institucional',
        target_url: 'https://exemplo.com',
        status: 'ativo',
        scan_count: 245,
        created_at: '2024-01-15',
        qr_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://exemplo.com'
    },
    {
        id: '2',
        name: 'Promoção Black Friday',
        target_url: 'https://loja.exemplo.com/blackfriday',
        status: 'ativo',
        scan_count: 1024,
        created_at: '2024-01-10',
        qr_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://loja.exemplo.com/blackfriday'
    },
    {
        id: '3',
        name: 'Menu Restaurante',
        target_url: 'https://restaurante.exemplo.com/menu',
        status: 'inativo',
        scan_count: 89,
        created_at: '2024-01-05',
        qr_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://restaurante.exemplo.com/menu'
    }
];

// Load QR codes into table
function loadQRCodes() {
    const tableBody = document.getElementById('qr-codes-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    qrCodes.forEach(qrCode => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="font-medium">${qrCode.name}</td>
            <td>
                <a href="${qrCode.target_url}" target="_blank" class="text-primary hover:text-primary-glow">
                    ${qrCode.target_url}
                </a>
            </td>
            <td>
                <span class="status-badge ${qrCode.status === 'ativo' ? 'status-active' : 'status-inactive'}">
                    ${qrCode.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </span>
            </td>
            <td>${qrCode.scan_count}</td>
            <td>${formatDate(qrCode.created_at)}</td>
            <td>
                <button onclick="editQRCode('${qrCode.id}')" class="action-btn edit">
                    <i data-lucide="edit" class="w-3 h-3 mr-1"></i>
                    Editar
                </button>
                <button onclick="viewQRCode('${qrCode.id}')" class="action-btn">
                    <i data-lucide="eye" class="w-3 h-3 mr-1"></i>
                    Ver
                </button>
                <button onclick="deleteQRCode('${qrCode.id}')" class="action-btn delete">
                    <i data-lucide="trash-2" class="w-3 h-3 mr-1"></i>
                    Excluir
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Reinitialize icons for new elements
    lucide.createIcons();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Dialog functions
function openCreateDialog() {
    document.getElementById('create-dialog').classList.remove('hidden');
}

function closeCreateDialog() {
    document.getElementById('create-dialog').classList.add('hidden');
    document.getElementById('create-form').reset();
}

// Handle create form submission
document.getElementById('create-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('qr-name').value;
    const url = document.getElementById('qr-url').value;
    
    // Generate new QR code
    const newQRCode = {
        id: Date.now().toString(),
        name: name,
        target_url: url,
        status: 'ativo',
        scan_count: 0,
        created_at: new Date().toISOString().split('T')[0],
        qr_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
    };
    
    qrCodes.unshift(newQRCode);
    loadQRCodes();
    closeCreateDialog();
    
    // Show success message
    showNotification('QR Code criado com sucesso!', 'success');
});

// QR Code actions
function editQRCode(id) {
    const qrCode = qrCodes.find(qr => qr.id === id);
    if (qrCode) {
        const newName = prompt('Nome do QR Code:', qrCode.name);
        const newUrl = prompt('URL de destino:', qrCode.target_url);
        
        if (newName && newUrl) {
            qrCode.name = newName;
            qrCode.target_url = newUrl;
            qrCode.qr_url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(newUrl)}`;
            loadQRCodes();
            showNotification('QR Code atualizado com sucesso!', 'success');
        }
    }
}

function viewQRCode(id) {
    const qrCode = qrCodes.find(qr => qr.id === id);
    if (qrCode) {
        window.open(qrCode.qr_url, '_blank');
    }
}

function deleteQRCode(id) {
    if (confirm('Tem certeza que deseja excluir este QR Code?')) {
        qrCodes = qrCodes.filter(qr => qr.id !== id);
        loadQRCodes();
        showNotification('QR Code excluído com sucesso!', 'success');
    }
}

// Logout function
function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        window.location.href = 'login.html';
    }
}

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

// Close dialog when clicking outside
document.getElementById('create-dialog').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCreateDialog();
    }
});