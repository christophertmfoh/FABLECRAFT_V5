# Comprehensive Vue/Nuxt Atoms List

## Definition of an Atom in Vue/Nuxt

An **atom** is the smallest, indivisible UI component that:
- Serves a single, specific purpose
- Cannot be broken down into smaller functional parts
- Contains no other Vue components (only HTML elements)
- Works independently in any context
- Has minimal logic (presentation-focused)
- Accepts only primitive props (strings, numbers, booleans)

## Complete Atoms Inventory

### Form Input Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseInput` | Standard text input | `<BaseInput v-model="name" placeholder="Enter name" />` |
| `BaseTextarea` | Multi-line text input | `<BaseTextarea v-model="description" rows="4" />` |
| `BaseSelect` | Dropdown selection | `<BaseSelect v-model="option" :options="items" />` |
| `BaseCheckbox` | Checkbox input | `<BaseCheckbox v-model="agreed" label="I agree" />` |
| `BaseRadio` | Radio button | `<BaseRadio v-model="choice" value="a" />` |
| `BaseSwitch` | Toggle switch | `<BaseSwitch v-model="enabled" />` |
| `BaseToggle` | Alternative toggle | `<BaseToggle v-model="active" />` |
| `BaseSlider` | Range slider | `<BaseSlider v-model="volume" :min="0" :max="100" />` |
| `BaseRange` | Range input | `<BaseRange v-model="price" :min="0" :max="1000" />` |
| `BaseNumber` | Number-only input | `<BaseNumber v-model="quantity" :min="1" />` |
| `BasePassword` | Password input | `<BasePassword v-model="password" />` |
| `BaseEmail` | Email input | `<BaseEmail v-model="email" />` |
| `BaseUrl` | URL input | `<BaseUrl v-model="website" />` |
| `BaseTel` | Phone number input | `<BaseTel v-model="phone" />` |
| `BaseSearch` | Search input | `<BaseSearch v-model="query" />` |
| `BaseDate` | Date input (native) | `<BaseDate v-model="date" />` |
| `BaseTime` | Time input (native) | `<BaseTime v-model="time" />` |
| `BaseDatetime` | DateTime input | `<BaseDatetime v-model="appointment" />` |
| `BaseMonth` | Month picker | `<BaseMonth v-model="month" />` |
| `BaseWeek` | Week picker | `<BaseWeek v-model="week" />` |
| `BaseColor` | Color picker | `<BaseColor v-model="color" />` |
| `BaseFile` | File upload | `<BaseFile @change="handleFile" accept="image/*" />` |
| `BaseHidden` | Hidden input | `<BaseHidden name="csrf" :value="token" />` |

### Button & Clickable Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseButton` | Standard button | `<BaseButton @click="submit">Submit</BaseButton>` |
| `BaseIconButton` | Icon-only button | `<BaseIconButton icon="close" @click="close" />` |
| `BaseLink` | Styled anchor | `<BaseLink href="/about">About Us</BaseLink>` |
| `BaseRouterLink` | Vue Router link | `<BaseRouterLink to="/dashboard">Dashboard</BaseRouterLink>` |
| `BaseExternalLink` | External link | `<BaseExternalLink href="https://...">Visit</BaseExternalLink>` |
| `BaseSubmit` | Submit button | `<BaseSubmit>Send Form</BaseSubmit>` |
| `BaseReset` | Reset button | `<BaseReset>Clear</BaseReset>` |

### Text & Typography Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseText` | Text wrapper | `<BaseText size="sm">Small text</BaseText>` |
| `BaseHeading` | Heading (h1-h6) | `<BaseHeading level="2">Section Title</BaseHeading>` |
| `BaseH1` | H1 heading | `<BaseH1>Page Title</BaseH1>` |
| `BaseH2` | H2 heading | `<BaseH2>Section</BaseH2>` |
| `BaseH3` | H3 heading | `<BaseH3>Subsection</BaseH3>` |
| `BaseH4` | H4 heading | `<BaseH4>Topic</BaseH4>` |
| `BaseH5` | H5 heading | `<BaseH5>Subtopic</BaseH5>` |
| `BaseH6` | H6 heading | `<BaseH6>Detail</BaseH6>` |
| `BaseParagraph` | Paragraph | `<BaseParagraph>Lorem ipsum...</BaseParagraph>` |
| `BaseStrong` | Bold text | `<BaseStrong>Important</BaseStrong>` |
| `BaseEm` | Italic text | `<BaseEm>Emphasis</BaseEm>` |
| `BaseSmall` | Small text | `<BaseSmall>Fine print</BaseSmall>` |
| `BaseMark` | Highlighted text | `<BaseMark>Highlighted</BaseMark>` |
| `BaseDel` | Deleted text | `<BaseDel>Removed</BaseDel>` |
| `BaseIns` | Inserted text | `<BaseIns>Added</BaseIns>` |
| `BaseSub` | Subscript | `<BaseSub>2</BaseSub>` |
| `BaseSup` | Superscript | `<BaseSup>TM</BaseSup>` |
| `BaseKbd` | Keyboard key | `<BaseKbd>Ctrl</BaseKbd>` |
| `BaseCode` | Inline code | `<BaseCode>const x = 1</BaseCode>` |
| `BasePre` | Preformatted text | `<BasePre>{{ code }}</BasePre>` |
| `BaseSamp` | Sample output | `<BaseSamp>Output</BaseSamp>` |
| `BaseVar` | Variable | `<BaseVar>x</BaseVar>` |
| `BaseAbbr` | Abbreviation | `<BaseAbbr title="World Health Organization">WHO</BaseAbbr>` |
| `BaseTime` | Time element | `<BaseTime :datetime="date">2 hours ago</BaseTime>` |
| `BaseData` | Data value | `<BaseData :value="123">123</BaseData>` |
| `BaseOutput` | Output element | `<BaseOutput>Result: 42</BaseOutput>` |
| `BaseBlockquote` | Quote block | `<BaseBlockquote>Quote text</BaseBlockquote>` |
| `BaseCite` | Citation | `<BaseCite>Author Name</BaseCite>` |
| `BaseQ` | Inline quote | `<BaseQ>quoted text</BaseQ>` |
| `BaseAddress` | Address element | `<BaseAddress>123 Main St</BaseAddress>` |

### Display & Status Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseLabel` | Form label | `<BaseLabel for="email">Email Address</BaseLabel>` |
| `BaseBadge` | Status badge | `<BaseBadge variant="success">Active</BaseBadge>` |
| `BaseTag` | Tag/chip | `<BaseTag>Category</BaseTag>` |
| `BasePill` | Pill-shaped badge | `<BasePill>New</BasePill>` |
| `BaseChip` | Chip component | `<BaseChip removable>Filter</BaseChip>` |
| `BaseDot` | Status dot | `<BaseDot color="green" />` |
| `BaseIndicator` | Generic indicator | `<BaseIndicator status="online" />` |
| `BaseStatus` | Status display | `<BaseStatus type="warning">Pending</BaseStatus>` |
| `BaseFlag` | Country flag | `<BaseFlag country="US" />` |
| `BaseNotificationDot` | Notification badge | `<BaseNotificationDot count="3" />` |
| `BasePulse` | Pulsing indicator | `<BasePulse color="blue" />` |
| `BaseBlip` | Radar blip | `<BaseBlip />` |
| `BaseBeacon` | Beacon indicator | `<BaseBeacon active />` |

### Media & Visual Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseIcon` | Icon wrapper | `<BaseIcon name="home" size="24" />` |
| `BaseImage` | Image element | `<BaseImage src="/logo.png" alt="Logo" />` |
| `BaseAvatar` | User avatar | `<BaseAvatar src="/user.jpg" size="md" />` |
| `BaseLogo` | Logo wrapper | `<BaseLogo />` |
| `BaseThumbnail` | Thumbnail image | `<BaseThumbnail src="/thumb.jpg" />` |
| `BasePicture` | Picture element | `<BasePicture :sources="sources" />` |
| `BaseFigure` | Figure element | `<BaseFigure src="/chart.png" />` |
| `BaseFigcaption` | Figure caption | `<BaseFigcaption>Chart description</BaseFigcaption>` |
| `BaseVideo` | Video element | `<BaseVideo src="/video.mp4" />` |
| `BaseAudio` | Audio element | `<BaseAudio src="/sound.mp3" />` |
| `BaseIframe` | Iframe wrapper | `<BaseIframe src="https://..." />` |
| `BaseEmbed` | Embed wrapper | `<BaseEmbed type="youtube" id="..." />` |
| `BaseObject` | Object element | `<BaseObject data="/file.pdf" />` |
| `BaseCanvas` | Canvas element | `<BaseCanvas width="300" height="200" />` |
| `BaseSvg` | SVG wrapper | `<BaseSvg viewBox="0 0 100 100" />` |

### Progress & Loading Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseSpinner` | Loading spinner | `<BaseSpinner size="sm" />` |
| `BaseLoader` | Loading indicator | `<BaseLoader text="Loading..." />` |
| `BaseProgress` | Progress bar | `<BaseProgress :value="60" :max="100" />` |
| `BaseProgressCircle` | Circular progress | `<BaseProgressCircle :percent="75" />` |
| `BaseProgressRing` | Ring progress | `<BaseProgressRing :value="0.8" />` |
| `BaseSkeleton` | Skeleton loader | `<BaseSkeleton type="text" />` |
| `BaseSkeletonText` | Text skeleton | `<BaseSkeletonText lines="3" />` |
| `BaseSkeletonCircle` | Circle skeleton | `<BaseSkeletonCircle size="40" />` |
| `BaseSkeletonRect` | Rectangle skeleton | `<BaseSkeletonRect width="200" height="100" />` |
| `BasePlaceholder` | Content placeholder | `<BasePlaceholder>Loading...</BasePlaceholder>` |
| `BaseMeter` | Meter gauge | `<BaseMeter :value="7" :min="0" :max="10" />` |

### Layout & Structure Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseDivider` | Visual separator | `<BaseDivider orientation="horizontal" />` |
| `BaseHr` | Horizontal rule | `<BaseHr />` |
| `BaseSpacer` | Spacing element | `<BaseSpacer size="lg" />` |
| `BaseGap` | Gap creator | `<BaseGap height="20px" />` |
| `BaseOverlay` | Overlay layer | `<BaseOverlay :show="isOpen" />` |
| `BaseBackdrop` | Modal backdrop | `<BaseBackdrop @click="close" />` |
| `BaseScrim` | Screen overlay | `<BaseScrim opacity="0.5" />` |
| `BaseContainer` | Container wrapper | `<BaseContainer size="md">Content</BaseContainer>` |
| `BaseWrapper` | Generic wrapper | `<BaseWrapper>Content</BaseWrapper>` |
| `BaseBox` | Box container | `<BaseBox padding="4">Content</BaseBox>` |
| `BaseSection` | Section wrapper | `<BaseSection>Content</BaseSection>` |
| `BaseArticle` | Article wrapper | `<BaseArticle>Content</BaseArticle>` |
| `BaseAside` | Aside wrapper | `<BaseAside>Sidebar</BaseAside>` |
| `BaseMain` | Main wrapper | `<BaseMain>Main content</BaseMain>` |
| `BaseHeader` | Header wrapper | `<BaseHeader>Header</BaseHeader>` |
| `BaseFooter` | Footer wrapper | `<BaseFooter>Footer</BaseFooter>` |
| `BaseNav` | Nav wrapper | `<BaseNav>Navigation</BaseNav>` |

### List Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseList` | List wrapper | `<BaseList type="unordered">...</BaseList>` |
| `BaseOrderedList` | Ordered list | `<BaseOrderedList>...</BaseOrderedList>` |
| `BaseUnorderedList` | Unordered list | `<BaseUnorderedList>...</BaseUnorderedList>` |
| `BaseListItem` | List item | `<BaseListItem>Item text</BaseListItem>` |
| `BaseDescriptionList` | Description list | `<BaseDescriptionList>...</BaseDescriptionList>` |
| `BaseTerm` | Definition term | `<BaseTerm>Term</BaseTerm>` |
| `BaseDefinition` | Definition desc | `<BaseDefinition>Definition</BaseDefinition>` |

### Table Atoms (when treated as atoms)

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseTable` | Table wrapper | `<BaseTable>...</BaseTable>` |
| `BaseTableHead` | Table head | `<BaseTableHead>...</BaseTableHead>` |
| `BaseTableBody` | Table body | `<BaseTableBody>...</BaseTableBody>` |
| `BaseTableFoot` | Table footer | `<BaseTableFoot>...</BaseTableFoot>` |
| `BaseTableRow` | Table row | `<BaseTableRow>...</BaseTableRow>` |
| `BaseTableCell` | Table cell | `<BaseTableCell>Data</BaseTableCell>` |
| `BaseTableHeader` | Header cell | `<BaseTableHeader>Column</BaseTableHeader>` |
| `BaseCaption` | Table caption | `<BaseCaption>Table description</BaseCaption>` |

### Interactive Enhancement Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseTooltip` | Tooltip (CSS-only) | `<BaseTooltip text="Help text" />` |
| `BasePopover` | Popover trigger | `<BasePopover>Content</BasePopover>` |
| `BaseFocusTrap` | Focus trap | `<BaseFocusTrap :active="isOpen" />` |
| `BaseClickOutside` | Click outside detector | `<BaseClickOutside @trigger="close" />` |
| `BasePortal` | Portal/Teleport | `<BasePortal to="body">Modal</BasePortal>` |
| `BaseTransition` | Transition wrapper | `<BaseTransition name="fade" />` |

### Form Helper Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseFieldset` | Fieldset wrapper | `<BaseFieldset legend="Options">...</BaseFieldset>` |
| `BaseLegend` | Fieldset legend | `<BaseLegend>Group Title</BaseLegend>` |
| `BaseOptgroup` | Option group | `<BaseOptgroup label="Group">...</BaseOptgroup>` |
| `BaseOption` | Select option | `<BaseOption value="1">Option 1</BaseOption>` |
| `BaseDatalist` | Datalist element | `<BaseDatalist :options="suggestions" />` |
| `BaseForm` | Form wrapper | `<BaseForm @submit="handleSubmit">...</BaseForm>` |

### Accessibility Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseVisuallyHidden` | Screen reader only | `<BaseVisuallyHidden>SR text</BaseVisuallyHidden>` |
| `BaseScreenReaderOnly` | SR-only content | `<BaseScreenReaderOnly>Help text</BaseScreenReaderOnly>` |
| `BaseSkipLink` | Skip navigation | `<BaseSkipLink href="#main">Skip to main</BaseSkipLink>` |
| `BaseLiveRegion` | ARIA live region | `<BaseLiveRegion>Updates here</BaseLiveRegion>` |
| `BaseAnnouncer` | SR announcer | `<BaseAnnouncer message="Saved" />` |
| `BaseAriaLabel` | ARIA label wrapper | `<BaseAriaLabel>Label text</BaseAriaLabel>` |
| `BaseAriaDescribedby` | ARIA description | `<BaseAriaDescribedby id="help">...</BaseAriaDescribedby>` |

### Utility Display Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseRating` | Star rating display | `<BaseRating :value="4.5" :max="5" />` |
| `BaseScore` | Score display | `<BaseScore :value="85" />` |
| `BasePercentage` | Percentage display | `<BasePercentage :value="0.75" />` |
| `BaseCurrency` | Currency display | `<BaseCurrency :amount="99.99" currency="USD" />` |
| `BaseUnit` | Unit display | `<BaseUnit value="100" unit="kg" />` |
| `BaseCounter` | Counter display | `<BaseCounter :value="42" />` |
| `BaseTimer` | Timer display | `<BaseTimer :seconds="120" />` |
| `BaseClock` | Clock display | `<BaseClock :time="date" />` |
| `BaseCalendar` | Calendar icon | `<BaseCalendar :date="today" />` |

### SVG Primitive Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseSvgCircle` | SVG circle | `<BaseSvgCircle :r="50" :cx="50" :cy="50" />` |
| `BaseSvgRect` | SVG rectangle | `<BaseSvgRect :width="100" :height="50" />` |
| `BaseSvgLine` | SVG line | `<BaseSvgLine :x1="0" :y1="0" :x2="100" :y2="100" />` |
| `BaseSvgPath` | SVG path | `<BaseSvgPath :d="pathData" />` |
| `BaseSvgPolygon` | SVG polygon | `<BaseSvgPolygon :points="points" />` |
| `BaseSvgPolyline` | SVG polyline | `<BaseSvgPolyline :points="points" />` |
| `BaseSvgEllipse` | SVG ellipse | `<BaseSvgEllipse :rx="50" :ry="25" />` |
| `BaseSvgText` | SVG text | `<BaseSvgText x="10" y="20">Text</BaseSvgText>` |
| `BaseSvgG` | SVG group | `<BaseSvgG transform="...">...</BaseSvgG>` |

### Special Purpose Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseQrCode` | QR code display | `<BaseQrCode value="https://..." />` |
| `BaseBarcode` | Barcode display | `<BaseBarcode value="123456789" />` |
| `BaseSparkline` | Sparkline chart | `<BaseSparkline :data="[1,2,3,4,5]" />` |
| `BaseEmoji` | Emoji wrapper | `<BaseEmoji>😀</BaseEmoji>` |
| `BaseGlyph` | Glyph/symbol | `<BaseGlyph name="arrow-right" />` |
| `BaseMath` | Math formula | `<BaseMath>x^2 + y^2</BaseMath>` |
| `BaseChemical` | Chemical formula | `<BaseChemical>H2O</BaseChemical>` |
| `BaseFootnote` | Footnote marker | `<BaseFootnote number="1" />` |
| `BaseAnnotation` | Annotation marker | `<BaseAnnotation>*</BaseAnnotation>` |

### Semantic HTML5 Atoms

| Component | Purpose | Example Usage |
|-----------|---------|---------------|
| `BaseDetails` | Details element | `<BaseDetails summary="More info">...</BaseDetails>` |
| `BaseSummary` | Summary element | `<BaseSummary>Click to expand</BaseSummary>` |
| `BaseDialog` | Dialog element | `<BaseDialog :open="isOpen">...</BaseDialog>` |
| `BaseMenu` | Menu element | `<BaseMenu>...</BaseMenu>` |
| `BaseMenuItem` | Menu item | `<BaseMenuItem>Option</BaseMenuItem>` |
| `BaseSearch` | Search element | `<BaseSearch>...</BaseSearch>` |
| `BaseWbr` | Word break opportunity | `<BaseWbr />` |
| `BaseBdi` | Bidirectional isolate | `<BaseBdi>مرحبا</BaseBdi>` |
| `BaseBdo` | Bidirectional override | `<BaseBdo dir="rtl">Text</BaseBdo>` |
| `BaseRp` | Ruby parenthesis | `<BaseRp>(</BaseRp>` |
| `BaseRt` | Ruby text | `<BaseRt>pronunciation</BaseRt>` |
| `BaseRuby` | Ruby annotation | `<BaseRuby>漢字</BaseRuby>` |

## Notes on Implementation

### What Makes a Valid Atom:
1. **Single HTML element wrapper** (with minimal enhancement)
2. **No component dependencies** (doesn't import other Vue components)
3. **Primitive props only** (string, number, boolean, arrays of primitives)
4. **Minimal internal logic** (basic conditionals, no complex state)
5. **Style customizable** via props/classes
6. **Context-independent** (works anywhere)

### What is NOT an Atom:
- Components that combine multiple atoms (those are molecules)
- Components with complex state management
- Components that fetch data
- Components that depend on specific app context
- Components containing other Vue components

### Naming Convention:
- All atoms should be prefixed with `Base` to distinguish them from molecules/organisms
- Use descriptive, semantic names that indicate function
- Keep names concise but clear

This list represents the most comprehensive collection of atoms possible in a Vue/Nuxt application. Not all projects will need every atom listed here - choose based on your specific requirements and design system needs.