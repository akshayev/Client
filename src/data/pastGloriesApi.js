// This file acts as a mock API for our past glories data.
// In a real-world application, this function would make a network request
// to a backend service (e.g., using fetch or axios).

// TODO: Replace the placeholder 'src' URLs below with your actual 11 links from postimage.
const pastGloriesData = {
  images: [
    { src: 'https://i.postimg.cc/m4qXTrwz/hallo1.jpg', style: { top: '5%', left: '10%', width: '25%', transform: 'rotate(-8deg)', zIndex: 1 } },
    { src: 'https://i.postimg.cc/dDSTLH3Q/hallo2.jpg', style: { top: '15%', left: '65%', width: '28%', transform: 'rotate(5deg)', zIndex: 2 } },
    { src: 'https://i.postimg.cc/mh6FtXD0/hallo3.jpg', style: { top: '30%', left: '25%', width: '20%', transform: 'rotate(10deg)', zIndex: 3 } },
    { src: 'https://i.postimg.cc/DmYb8j0T/hallo4.jpg', style: { top: '50%', left: '5%', width: '30%', transform: 'rotate(-12deg)', zIndex: 4 } },
    { src: 'https://i.postimg.cc/kDhtB1Gd/hallo5.jpg', style: { top: '45%', left: '50%', width: '25%', transform: 'rotate(3deg)', zIndex: 5 } },
    { src: 'https://i.postimg.cc/14YNfCXX/hallo6.jpg', style: { top: '70%', left: '70%', width: '22%', transform: 'rotate(-5deg)', zIndex: 6 } },
    { src: 'https://i.postimg.cc/SJ2Y86YN/hallo7.jpg', style: { top: '80%', left: '20%', width: '32%', transform: 'rotate(8deg)', zIndex: 7 } },
    { src: 'https://i.postimg.cc/zVbHWCHH/hallo8.jpg', style: { top: '5%', left: '40%', width: '20%', transform: 'rotate(4deg)', zIndex: 8 } },
    { src: 'https://i.postimg.cc/svQGSYG7/hallo9.jpg', style: { top: '90%', left: '55%', width: '25%', transform: 'rotate(-9deg)', zIndex: 9 } },
    { src: 'https://i.postimg.cc/BXLPDTPx/hallo10.jpg', style: { top: '65%', left: '35%', width: '28%', transform: 'rotate(15deg)', zIndex: 10 } },
    { src: 'https://i.postimg.cc/JGDHJNHY/hallo11.jpg', style: { top: '35%', left: '80%', width: '18%', transform: 'rotate(-4deg)', zIndex: 11 } },
  ]
};

export const fetchPastGloriesData = async () => {
  // We wrap the data in a Promise to simulate an asynchronous API call.
  // Using an async function makes this slightly cleaner.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a 0.5s network delay
  return pastGloriesData;
};