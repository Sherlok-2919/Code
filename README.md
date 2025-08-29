# Teachers Day Celebration App

A futuristic, interactive web application for celebrating Teachers Day at JIS College of Engineering. This app features a holographic card generator and celebration interface.

## Features

- 🎉 Interactive Teachers Day celebration interface
- 🎨 Futuristic holographic card generator
- 📱 Responsive design for all devices
- ✨ Real-time teacher verification system
- 🎁 Personalized greeting card downloads
- 🌟 Modern UI with animations and effects

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: CSS animations + Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teachers-day-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically detect Next.js and configure the build

2. **Automatic Deployment**:
   - Every push to main branch triggers automatic deployment
   - Preview deployments for pull requests

3. **Environment Variables** (if needed):
   - Add any environment variables in Vercel dashboard
   - No environment variables required for basic functionality

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── hu/            # Custom components
├── data/              # Data files
│   └── teachers.ts    # Teacher database
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Teacher Database

The app includes a pre-approved list of teachers in `src/data/teachers.ts`. To add or modify teachers:

1. Edit the `approvedTeachers` array
2. The verification system will automatically update

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Customize theme in `tailwind.config.ts`

### Content
- Update teacher list in `src/data/teachers.ts`
- Modify celebration text in `src/app/page.tsx`
- Add new features in the main component

## Performance Optimizations

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ Optimized bundle size
- ✅ Static generation where possible
- ✅ Image optimization
- ✅ Code splitting

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes and Teachers Day celebration.

## Support

For any issues or questions, please create an issue in the repository.

---

**Happy Teachers Day! 🎉**
