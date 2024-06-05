import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const useDriver = (steps) => {
    const storyHomepage = driver({
        animate: true,
        showProgress: true,
        nextBtnText: 'Next',
        prevBtnText: 'Back',
        steps,
        onPopoverRender: (popover) => {
            popover.nextButton.style.fontFamily = 'Nunito Sans, sans-serif';
            popover.previousButton.style.fontFamily = 'Nunito Sans, sans-serif';
            popover.title.style.fontFamily = 'Nunito Sans, sans-serif';
            popover.description.style.fontFamily = 'Nunito Sans, sans-serif';
        },
    });
    storyHomepage.drive();
};

export default useDriver;
