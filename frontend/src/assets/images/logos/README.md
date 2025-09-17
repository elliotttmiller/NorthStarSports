# Team Logo Files Structure

When you add your NFL and NBA team logos, place them in this structure:

## NFL Teams
```
/src/assets/images/logos/nfl/
├── arizona-cardinals.svg
├── arizona-cardinals.png  
├── atlanta-falcons.svg
├── atlanta-falcons.png
├── baltimore-ravens.svg
├── baltimore-ravens.png
... (all 32 NFL teams)
```

## NBA Teams  
```
/src/assets/images/logos/nba/
├── atlanta-hawks.svg
├── atlanta-hawks.png
├── boston-celtics.svg
├── boston-celtics.png
├── brooklyn-nets.svg
├── brooklyn-nets.png
... (all 30 NBA teams)
```

## File Naming Convention
- Use lowercase with hyphens: `team-city-name.svg`
- Examples: `los-angeles-lakers.svg`, `new-york-giants.svg`
- Both SVG (preferred) and PNG formats supported
- SVG files will be used first, PNG as fallback

## Automatic Features
- **Smart Fallbacks**: If logo file missing, shows team abbreviation with team colors
- **Responsive Sizing**: Automatically scales for mobile/desktop
- **Color Integration**: Uses official team colors for backgrounds and accents  
- **Perfect Alignment**: Consistent sizing across all components
- **Animation Support**: Smooth loading and hover effects
- **Format Detection**: Automatically chooses best format (SVG > PNG)

## Sizes Available
- xs: 16px (sidebar, small lists)
- sm: 24px (compact cards, mobile)
- md: 32px (standard cards) 
- lg: 48px (featured games)
- xl: 64px (detail pages)
- 2xl: 80px (hero sections)

Once you add the logo files, they'll automatically appear throughout the app!
