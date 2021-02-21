module.exports = {
    apps: [
      {
         name: 'entertainme - Client',
         script: './client && npm install && npm start',
      },
      {
        name: 'entertainme - Orchestrator',
        script: './server/orchestrator && npm install && nodemon app.js',
      },
      {
        name: 'entertainme - Service Movies',
        script: './server/services/movies && npm install && nodemon app.js',
        
      },
      {
        name: 'entertainme - Service TV Series',
        script: './server/services/series && npm install && nodemon app.js',
      },
    ],
  };