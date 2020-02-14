
Object.defineProperties(global, {
  singjyf: {
    value: (song) => {
      console.log('song:', song);
    },
    writable: false,
  },
});
