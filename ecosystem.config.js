module.exports = {
  apps: [{
    name: 'file-server',
    script: 'server.js',
    instances: 'max', // Use all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Logging
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Restart policy
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    
    // Watch for changes (disable in production)
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'uploads'],
    
    // Environment variables
    env_file: '.env'
  }]
}; 