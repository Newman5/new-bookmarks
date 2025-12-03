# Contributing to Recent Bookmarks

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

### 1. Report Bugs

Found a bug? Please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser version and OS
- Screenshots if applicable

### 2. Suggest Features

Have an idea? Open an issue with:

- Clear description of the feature
- Why it would be useful
- How it might work
- Any examples or mockups

### 3. Improve Documentation

- Fix typos or unclear explanations
- Add examples or tutorials
- Translate documentation
- Improve code comments

### 4. Submit Code

- Fix bugs
- Implement features
- Improve performance
- Add tests
- Refactor code

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Firefox or Chrome for testing
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**

```bash
git clone https://github.com/YOUR-USERNAME/recent-bookmarks.git
cd recent-bookmarks
```

2. **Install Dependencies**

```bash
npm install
```

3. **Create a Branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

4. **Make Your Changes**

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

5. **Test Your Changes**

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Test in browser
npm run start:firefox
```

6. **Commit Your Changes**

```bash
git add .
git commit -m "feat: add search functionality"
# or
git commit -m "fix: resolve popup loading issue"
```

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or tool changes

7. **Push and Create PR**

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Code Style Guidelines

### JavaScript

- Use ES6+ features (const, let, arrow functions, etc.)
- No `var` declarations
- Use single quotes for strings
- 2 spaces for indentation
- Semicolons required
- Descriptive variable and function names
- Keep functions small and focused

### Example

```javascript
// Good
const getRecentBookmarks = async (limit = 100) => {
  const bookmarks = await browser.bookmarks.getRecent(limit);
  return bookmarks.filter((bookmark) => bookmark.url);
};

// Avoid
var get_bookmarks = function (l) {
  return browser.bookmarks.getRecent(l);
};
```

### HTML

- Semantic HTML5 elements
- Proper indentation (2 spaces)
- Accessible markup (ARIA labels, alt text)
- Descriptive IDs and classes

### CSS

- Mobile-first approach
- BEM naming convention (optional but encouraged)
- Organize by component
- Use CSS variables for theming
- Keep specificity low

### Comments

- Explain "why" not "what"
- Document complex algorithms
- Add JSDoc for functions
- Keep comments updated with code

## 🧪 Testing

### Manual Testing

- Test on Firefox, Chrome, and Edge
- Test both light and dark modes
- Test with various bookmark counts (0, 10, 100, 1000+)
- Test search and filter functionality
- Test settings persistence
- Check for console errors
- Verify performance

### Browser Testing Checklist

- [ ] Extension loads without errors
- [ ] Popup displays correctly
- [ ] Search works as expected
- [ ] Filters apply correctly
- [ ] Settings save and load
- [ ] Dark mode toggles properly
- [ ] Export functions work
- [ ] No console errors
- [ ] Performance is acceptable (<100ms popup)

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Linting passes (`npm run lint`)
- [ ] Changes are tested in browser
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No console.log() left in code (unless intentional)

### PR Description

Include:

- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots/GIFs for UI changes
- Related issue numbers (fixes #123)

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing

- [ ] Tested on Firefox
- [ ] Tested on Chrome
- [ ] Tested on Edge

## Screenshots

(if applicable)

## Related Issues

Fixes #(issue number)
```

## 🎯 Priority Areas for Contribution

### High Priority

1. Manifest V3 migration
2. Cross-browser compatibility
3. Modern UI/UX improvements
4. Performance optimization
5. Bug fixes

### Medium Priority

1. Advanced search features
2. Export functionality
3. Statistics and analytics
4. Keyboard shortcuts
5. Accessibility improvements

### Future Features

1. Cloud sync
2. AI-powered categorization
3. Team collaboration
4. Mobile companion app

## 🐛 Bug Reports

Good bug reports include:

```markdown
**Bug Description**
Clear description of the problem

**Steps to Reproduce**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**

- Browser: Firefox 122
- OS: macOS 14.2
- Extension Version: 0.2

**Screenshots**
(if applicable)

**Console Errors**
(if any)
```

## 💡 Feature Requests

Good feature requests include:

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why this feature would be useful

**Proposed Solution**
How it might work (optional)

**Alternatives**
Other ways to solve the problem (optional)

**Additional Context**
Examples, mockups, or links (optional)
```

## 🏗️ Project Structure

```
recent-bookmarks/
├── background.js          # Background service worker
├── popup.html            # Popup HTML
├── popup.js              # Popup JavaScript
├── popup.css             # Popup styles (to be added)
├── manifest.json         # Extension manifest
├── icons/                # Extension icons
├── docs/                 # Documentation
│   ├── MODERNIZATION_STRATEGY.md
│   ├── MONETIZATION_STRATEGY.md
│   └── MVP_ROADMAP.md
├── scripts/              # Build scripts (to be added)
├── tests/                # Tests (to be added)
└── package.json          # Dependencies
```

## 📚 Resources

### Learning

- [MDN WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome Extensions Docs](https://developer.chrome.com/docs/extensions/)
- [Browser Extension Workshop](https://extensionworkshop.com/)

### Tools

- [web-ext](https://github.com/mozilla/web-ext) - Testing and packaging
- [ESLint](https://eslint.org/) - Code linting

### Community

- [GitHub Discussions](https://github.com/Newman5/recent-bookmarks/discussions)
- [GitHub Issues](https://github.com/Newman5/recent-bookmarks/issues)

## 🤔 Questions?

- Check existing issues and discussions
- Read the documentation
- Ask in GitHub Discussions
- Open a new issue if needed

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions
- Follow GitHub's Community Guidelines

## 🎉 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation
- Thanked publicly

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Recent Bookmarks! 🙏**
