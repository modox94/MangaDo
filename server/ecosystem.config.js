module.exports = {
  apps: [
    {
      name: 'back',
      script: 'npm',
      args: 'start',
      watch: true,
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'public'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
