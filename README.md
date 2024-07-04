[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsmart-cine%2Fsmartcine-website%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visitors&edge_flat=true)](https://hits.seeyoufarm.com)
![Time-work](https://wakatime.com/badge/user/592c97c4-15ad-49cb-ac34-d607be35c524/project/afba0b32-c17f-4696-9de2-720d8ac964a1.svg)

# SmartCine

## Overview

SmartCine is a web application that allows users to book tickets for a cinema in real-time. The project is built using Next.js, shadcn/ui, and Tailwind CSS for styling.

## Features

- Real-time ticket booking: Users can book tickets for a movie in real-time, with the available seats updating instantly.
- Seat selection: Users can select the seats they want to book.
- User authentication: Users can create an account and log in to the application.
- Order history: Users can view their past ticket orders.
- Admin panel: Administrators can manage the movies, showtimes, and ticket sales.

## Technologies Used

- **Next.js**: A React framework for building server-rendered, static, and hybrid web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **TypeScript**: A statically typed superset of JavaScript that adds optional static typing to the language.
- **@tanstack/react-query**: Powerful  asynchronous state management  for TS/JS, React, ...

## Getting Started

To run the SmartCine project locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/smart-cine/smartcine-website.git
   ```

2. Install the dependencies:

   ```shell
   cd smartcine-website
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env.development` file in the project root directory.
   - Add these environment variables:  **API_URL=<http://<yourserver>/api/>** **API_VERSION=v1**

4. Start the development server:

   ```shell
   npm run dev
   ```

5. Open the application in your browser:

   ```shell
   http://localhost:5170
   ```

## Demo

![demo1](https://github.com/smart-cine/smartcine-website/blob/main/public/screenshot/1.png?raw=true)
![demo2](https://github.com/smart-cine/smartcine-website/blob/main/public/screenshot/2.png?raw=true)
![demo3](https://github.com/smart-cine/smartcine-website/blob/main/public/screenshot/3.png?raw=true)

## Acknowledgment

The design of this website draws inspiration from Momo Cinema

- Design reference: <https://momo.vn/cinema>

## Contributing

Contributions to the SmartCine project are welcome. If you find any issues or have suggestions for improvements, please feel free to create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
