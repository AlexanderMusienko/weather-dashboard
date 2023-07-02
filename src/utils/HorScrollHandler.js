export const HorScrollHandler = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    const scrollAmount = e.deltaY * 2;
    const scrollDuration = 300; // Adjust the duration as needed
  
    const startTime = performance.now();
    const startPosition = container.scrollLeft;
    let progress;
  
    const scrollStep = (timestamp) => {
      progress = (timestamp - startTime) / scrollDuration;
      if (progress > 1) {
        progress = 1;
      }
  
      const easing = easeOutCubic(progress);
      const scrollPosition = startPosition + scrollAmount * easing;
      container.scrollTo({
        left: scrollPosition,
        behavior: "auto",
      });
  
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    };
  
    requestAnimationFrame(scrollStep);
  };
  
  // Easing function for smooth animation
  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };
  