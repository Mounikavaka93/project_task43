export const features = [
  {
    title: 'Live cash snapshot',
    description: 'See balances, upcoming bills, and idle cash in one glance — no tab-hopping between banks.',
    icon: 'wallet',
  },
  {
    title: 'Spending that tells a story',
    description: 'Categories, merchants, and trends that update as you swipe. Catch leaks before they grow.',
    icon: 'pie',
  },
  {
    title: 'Goals with a pulse',
    description: 'Emergency fund, trip, or down payment — Quorvia paces contributions so the goal stays realistic.',
    icon: 'target',
  },
  {
    title: 'Quiet alerts',
    description: 'Large charges, low balances, and bill reminders — only the signals that actually need you.',
    icon: 'bell',
  },
  {
    title: 'Shared household view',
    description: 'Invite a partner, split categories, and keep private accounts private.',
    icon: 'users',
  },
  {
    title: 'Export-ready reports',
    description: 'Monthly summaries you can send to an advisor, or just keep for tax season.',
    icon: 'file',
  },
]

export const testimonials = [
  {
    quote: 'I finally stopped opening five banking apps every Sunday. Quorvia is the only screen I trust.',
    name: 'Priya Shah',
    role: 'Design director, Oakland',
    initials: 'PS',
  },
  {
    quote: 'The savings pace is honest. It told me my Bali fund was a fantasy until I cut two subscriptions.',
    name: 'Marcus Chen',
    role: 'Founder, Austin',
    initials: 'MC',
  },
  {
    quote: 'We run household money together now without the spreadsheet arguments. That is not a small thing.',
    name: 'Elena Voss',
    role: 'Physician, Brooklyn',
    initials: 'EV',
  },
]

export const stats = [
  { label: 'Total balance', value: '$48,260', change: '+6.4%', up: true, hint: 'vs last month' },
  { label: 'Monthly income', value: '$8,420', change: '+2.1%', up: true, hint: 'after transfers' },
  { label: 'Spent this month', value: '$3,186', change: '−8.0%', up: true, hint: 'under budget' },
  { label: 'Savings rate', value: '27%', change: '+3 pts', up: true, hint: 'on track' },
]

export const cashflow = [
  { month: 'Apr', income: 7900, spend: 3400 },
  { month: 'May', income: 8100, spend: 3600 },
  { month: 'Jun', income: 8050, spend: 4100 },
  { month: 'Jul', income: 8300, spend: 3200 },
  { month: 'Aug', income: 8280, spend: 3550 },
  { month: 'Sep', income: 8420, spend: 3186 },
]

export const spending = [
  { name: 'Housing', value: 1650, color: '#124f45' },
  { name: 'Groceries', value: 540, color: '#c47a2c' },
  { name: 'Transit', value: 210, color: '#3d8bfd' },
  { name: 'Dining', value: 386, color: '#b85c38' },
  { name: 'Other', value: 400, color: '#8b8376' },
]

export const activity = [
  { id: 1, merchant: 'Whole Foods', category: 'Groceries', amount: -64.18, date: 'Today, 9:14 AM', type: 'card' },
  { id: 2, merchant: 'Payroll · Northwind', category: 'Income', amount: 4210.0, date: 'Yesterday', type: 'income' },
  { id: 3, merchant: 'PG&E', category: 'Utilities', amount: -98.4, date: 'Sep 28', type: 'bill' },
  { id: 4, merchant: 'Blue Bottle', category: 'Dining', amount: -7.5, date: 'Sep 28', type: 'card' },
  { id: 5, merchant: 'Transfer to Emergency', category: 'Savings', amount: -400.0, date: 'Sep 27', type: 'transfer' },
  { id: 6, merchant: 'Caltrain monthly', category: 'Transit', amount: -128.0, date: 'Sep 26', type: 'bill' },
]
