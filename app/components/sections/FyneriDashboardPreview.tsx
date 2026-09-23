'use client';

import type { ReactNode } from 'react';
import { useContext } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { LanguageContext } from '../../contexts/LanguageContext';
import { labels, type ProjectKey, type ScreenKey, type ShowcaseLabels } from './fyneri-showcase-copy';

const barValues = [32, 48, 40, 65, 54, 78, 58, 88, 72, 95, 69, 83, 55, 75, 100, 68, 84, 60, 90, 72, 96, 62, 78, 55, 86, 66, 92, 74, 100, 82];
const revenueValues = [36, 48, 42, 56, 49, 67, 60, 71, 58, 82, 75, 88];
const sampleOrders = [
  { id: 'AN-2048', name: 'Camille R.', source: 'Shopify', amount: '€184.00', status: 'paid' as const },
  { id: 'AN-2047', name: 'Alex M.', source: 'WooCommerce', amount: '€72.50', status: 'processing' as const },
  { id: 'AN-2046', name: 'Morgan T.', source: 'Shopify', amount: '€236.00', status: 'paid' as const },
  { id: 'AN-2045', name: 'Sam L.', source: 'WooCommerce', amount: '€48.00', status: 'refunded' as const },
];

function Metric({ label, value, change, accent = 'cyan' }: { label: string; value: string; change?: string; accent?: 'cyan' | 'violet' | 'amber' | 'emerald' }) {
  const { language } = useContext(LanguageContext);
  const accentClass = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
  }[accent];
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 md:p-4">
      <p className="text-[10px] font-medium text-slate-400 md:text-xs">{label}</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-1">
        <p className="font-display text-lg font-semibold tracking-tight text-white md:text-2xl">{formatMoney(value, language)}</p>
        {change && <span className={`text-[10px] font-medium ${accentClass}`}>{change}</span>}
      </div>
    </div>
  );
}

function formatMoney(value: string, language: 'fr' | 'en') {
  if (language === 'en' || !value.startsWith('€')) return value;
  const raw = value.slice(1).replace(/,/g, '');
  const hasCents = /\.\d{2}$/.test(raw);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(Number(raw));
}

function demoLanguage(t: ShowcaseLabels): 'fr' | 'en' {
  return t.overview === 'Vue d’ensemble' ? 'fr' : 'en';
}

function Panel({ title, action, children, className = '' }: { title: string; action?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 md:p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold text-slate-100 md:text-sm">{title}</h3>
        {action && <span className="text-[10px] text-slate-500">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function Status({ type, labels: t }: { type: 'paid' | 'processing' | 'refunded' | 'connected' | 'review'; labels: ShowcaseLabels }) {
  const copy = type === 'paid' ? t.paid : type === 'processing' ? t.processing : type === 'refunded' ? t.refunded : type === 'connected' ? t.connected : t.reconnect;
  const style = type === 'paid' || type === 'connected' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : type === 'review' ? 'border-amber-400/20 bg-amber-400/10 text-amber-300' : 'border-slate-400/20 bg-slate-400/10 text-slate-300';
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] ${style}`}>{(type === 'paid' || type === 'connected') && <FaCheck size={8} />}{copy}</span>;
}

function DemoChart({ values, labels: t, color = 'from-cyan-400 to-violet-500' }: { values: number[]; labels: ShowcaseLabels; color?: string }) {
  return (
    <div className="pt-2">
      <div className="flex h-28 items-end gap-1 border-b border-l border-white/[0.08] px-2 md:h-36">
        {values.map((height, index) => (
          <div key={index} className="group relative flex h-full flex-1 items-end">
            <span className={`w-full rounded-t-[2px] bg-gradient-to-t ${color} opacity-70 transition-opacity group-hover:opacity-100`} style={{ height: `${height}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[8px] text-slate-500 md:text-[9px]">
        {t.days.map((day) => <span key={day}>{day}</span>)}
      </div>
    </div>
  );
}

function RevenueSource({ name, amount, percent, color }: { name: string; amount: string; percent: number; color: string }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-[10px] md:text-xs">
        <span className="flex min-w-0 items-center gap-2 text-slate-300"><span className={`h-2 w-2 shrink-0 rounded-full ${color}`} />{name}</span>
        <span className="shrink-0 font-medium text-white">{formatMoney(amount, language)}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} /></div>
    </div>
  );
}

function OrdersTable({ labels: t }: { labels: ShowcaseLabels }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[470px] text-left text-[10px] md:text-xs">
        <thead className="text-[9px] uppercase tracking-wider text-slate-500">
          <tr>{['#', t.customer, t.source, t.amount, t.status].map((heading) => <th key={heading} className="border-b border-white/[0.07] px-2 py-2 font-medium">{heading}</th>)}</tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.id} className="text-slate-300">
              <td className="border-b border-white/[0.05] px-2 py-2.5 font-mono text-cyan-200">{order.id}</td>
              <td className="border-b border-white/[0.05] px-2 py-2.5">{order.name}</td>
              <td className="border-b border-white/[0.05] px-2 py-2.5">{order.source}</td>
              <td className="border-b border-white/[0.05] px-2 py-2.5 font-medium text-white">{formatMoney(order.amount, language)}</td>
              <td className="border-b border-white/[0.05] px-2 py-2.5"><Status type={order.status} labels={t} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OverviewScreen({ labels: t, project }: { labels: ShowcaseLabels; project: ProjectKey }) {
  if (project === 'dashpsp') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          <Metric label={t.processingVolume} value="€248,390" change="+12.8%" />
          <Metric label={t.netPayouts} value="€231,804" change="+9.2%" accent="emerald" />
          <Metric label={t.ordersCount} value="3,482" change="+8.4%" accent="violet" />
          <Metric label={t.activeConnections} value="5 / 6" change={t.reviewCount} accent="amber" />
        </div>
        <div className="grid gap-3 xl:grid-cols-[1.45fr_1fr]">
          <Panel title={t.revenueTrend} action={t.monthOverview}>
            <DemoChart values={revenueValues} labels={t} />
          </Panel>
          <Panel title={t.sourcesOfIncome} action={formatMoney('€248,390', demoLanguage(t))}>
            <div className="space-y-3 pt-1">
              <RevenueSource name="Shopify · Atelier Nova" amount="€96,240" percent={78} color="bg-cyan-400" />
              <RevenueSource name="WooCommerce · Maison Lune" amount="€71,820" percent={58} color="bg-violet-400" />
              <RevenueSource name={t.subscriptions} amount="€48,300" percent={39} color="bg-amber-400" />
              <RevenueSource name={t.otherOnlineRevenue} amount="€32,030" percent={26} color="bg-emerald-400" />
            </div>
          </Panel>
        </div>
        <Panel title={t.recentOrders} action={t.allOrders}><OrdersTable labels={t} /></Panel>
      </div>
    );
  }

  if (project === 'oneclick') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          <Metric label={t.totalRevenue} value="€42,680" change="+16.2%" />
          <Metric label={t.checkoutVisits} value="8,246" change="+11.5%" accent="violet" />
          <Metric label={t.completedOrders} value="1,138" change="+7.8%" accent="emerald" />
          <Metric label={t.checkoutRate} value="13.8%" change="+1.4 pts" accent="amber" />
        </div>
        <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr]">
          <Panel title={t.revenueTrend} action="Atelier Nova · EUR">
            <DemoChart values={barValues} labels={t} color="from-violet-400 to-cyan-300" />
          </Panel>
          <Panel title={t.store} action="Atelier Nova">
            <div className="space-y-3 text-[10px] md:text-xs">
              <div className="flex items-center justify-between rounded-lg bg-white/[0.035] p-3"><span className="text-slate-400">Shopify</span><Status type="connected" labels={t} /></div>
              <div className="flex items-center justify-between rounded-lg bg-white/[0.035] p-3"><span className="text-slate-400">WooCommerce</span><Status type="connected" labels={t} /></div>
              <div className="flex items-center justify-between rounded-lg bg-white/[0.035] p-3"><span className="text-slate-400">Stripe</span><Status type="connected" labels={t} /></div>
              <div className="rounded-lg border border-cyan-300/10 bg-cyan-400/[0.05] p-3 text-slate-300">{t.paymentMethods}<div className="mt-2 flex flex-wrap gap-1.5"><span className="rounded bg-white/[0.06] px-2 py-1">Visa</span><span className="rounded bg-white/[0.06] px-2 py-1">PayPal</span><span className="rounded bg-white/[0.06] px-2 py-1">Apple Pay</span></div></div>
            </div>
          </Panel>
        </div>
        <Panel title={t.recentOrders} action={t.allOrders}><OrdersTable labels={t} /></Panel>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        <Metric label={t.totalRevenue} value="€84,290" change="+18.6%" />
        <Metric label={t.ordersCount} value="1,284" change="+9.3%" accent="violet" />
        <Metric label={t.conversion} value="4.62%" change="+0.8 pt" accent="emerald" />
        <Metric label={t.averageOrder} value="€65.64" change="+4.1%" accent="amber" />
      </div>
      <div className="grid gap-3 xl:grid-cols-[1.5fr_1fr]">
        <Panel title={t.revenueTrend} action="Atelier Nova · EUR">
          <DemoChart values={barValues} labels={t} />
        </Panel>
        <Panel title={t.sourcesOfIncome}>
          <div className="space-y-3 pt-1">
            <RevenueSource name="Shopify store" amount="€46,820" percent={72} color="bg-emerald-400" />
            <RevenueSource name="WooCommerce" amount="€24,560" percent={38} color="bg-violet-400" />
            <RevenueSource name="Online checkout" amount="€12,910" percent={20} color="bg-cyan-400" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3">
            <div><p className="text-[9px] text-slate-500">{t.ordersCount}</p><p className="mt-1 text-sm font-semibold text-white">1,284</p></div>
            <div><p className="text-[9px] text-slate-500">{t.averageOrder}</p><p className="mt-1 text-sm font-semibold text-white">€65.64</p></div>
          </div>
        </Panel>
      </div>
      <Panel title={t.recentOrders} action={t.allOrders}><OrdersTable labels={t} /></Panel>
    </div>
  );
}

function ConnectorsScreen({ labels: t }: { labels: ShowcaseLabels }) {
  const connectors = [
    { brand: 'Stripe', kind: t.connectorProcessing, color: 'bg-violet-400', state: 'connected' as const },
    { brand: 'PayPal', kind: t.connectorProcessing, color: 'bg-sky-400', state: 'connected' as const },
    { brand: 'Shopify Payments', kind: t.connectorStorePayments, color: 'bg-emerald-400', state: 'connected' as const },
    { brand: 'WooCommerce', kind: t.connectorStoreOrders, color: 'bg-fuchsia-400', state: 'connected' as const },
    { brand: 'Mollie', kind: t.connectorProcessing, color: 'bg-blue-400', state: 'connected' as const },
    { brand: 'Adyen', kind: t.connectorProcessing, color: 'bg-amber-400', state: 'review' as const },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        <Metric label={t.activeConnections} value="5 / 6" accent="emerald" />
        <Metric label={t.processingVolume} value="€248,390" change="+12.8%" />
        <Metric label={t.netPayouts} value="€231,804" change="+9.2%" accent="violet" />
      </div>
      <Panel title={t.activeConnections} action={t.activeDemo}>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {connectors.map((connector) => (
            <div key={connector.brand} className="flex min-w-0 items-center gap-3 rounded-lg border border-white/[0.07] bg-black/10 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]"><span className={`h-2.5 w-2.5 rounded-full ${connector.color}`} /></span>
              <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white">{connector.brand}</p><p className="mt-1 truncate text-[9px] text-slate-500">{connector.kind}</p></div>
              <Status type={connector.state} labels={t} />
            </div>
          ))}
        </div>
      </Panel>
      <div className="grid gap-3 xl:grid-cols-2">
        <Panel title={t.sourcesOfIncome} action={t.monthOverview}>
          <div className="space-y-3">
            <RevenueSource name="Shopify · Atelier Nova" amount="€96,240" percent={78} color="bg-cyan-400" />
            <RevenueSource name="WooCommerce · Maison Lune" amount="€71,820" percent={58} color="bg-violet-400" />
            <RevenueSource name={t.subscriptions} amount="€48,300" percent={39} color="bg-amber-400" />
            <RevenueSource name={t.otherOnlineRevenue} amount="€32,030" percent={26} color="bg-emerald-400" />
          </div>
        </Panel>
        <Panel title={t.revenueTrend} action={t.monthOverview}>
          <DemoChart values={revenueValues} labels={t} />
        </Panel>
      </div>
    </div>
  );
}

function OrdersScreen({ labels: t }: { labels: ShowcaseLabels }) {
  return <div className="space-y-4"><div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3"><Metric label={t.ordersCount} value="1,284" change="+9.3%" /><Metric label={t.totalRevenue} value="€84,290" change="+18.6%" accent="violet" /><Metric label={t.conversion} value="4.62%" accent="emerald" /><Metric label={t.averageOrder} value="€65.64" accent="amber" /></div><Panel title={t.recentOrders} action="4 sample rows"><OrdersTable labels={t} /></Panel></div>;
}

function CheckoutScreen({ labels: t }: { labels: ShowcaseLabels }) {
  return (
    <div className="grid gap-3 xl:grid-cols-[1.25fr_0.75fr]">
      <Panel title={t.previewLabel} action="checkout.atelier-nova.example">
        <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#f7f8fa] p-4 text-slate-800 md:p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3"><span className="text-xs font-bold tracking-wide">ATELIER NOVA</span><span className="text-[9px] text-slate-500">{t.secureCheckout}</span></div>
          <div className="mt-4 flex items-center justify-between text-[10px]"><span className="font-semibold">{t.summary}</span><span className="text-slate-500">{t.sampleOrder} #DEMO-2048</span></div>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5"><div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-orange-100 to-amber-200 text-lg">✦</div><div className="flex-1"><p className="text-[10px] font-semibold">Everyday carry set</p><p className="mt-1 text-[9px] text-slate-500">Sand · {t.sampleProduct}</p></div><span className="text-[10px] font-semibold">{formatMoney('€89.00', t.overview === 'Vue d’ensemble' ? 'fr' : 'en')}</span></div>
          <div className="mt-3 space-y-2 text-[9px]"><div className="flex justify-between text-slate-500"><span>{t.subtotal}</span><span>{formatMoney('€89.00', t.overview === 'Vue d’ensemble' ? 'fr' : 'en')}</span></div><div className="flex justify-between text-slate-500"><span>{t.shipping}</span><span>{formatMoney('€4.90', t.overview === 'Vue d’ensemble' ? 'fr' : 'en')}</span></div><div className="flex justify-between border-t border-slate-200 pt-2 text-xs font-bold"><span>{t.total}</span><span>{formatMoney('€93.90', t.overview === 'Vue d’ensemble' ? 'fr' : 'en')}</span></div></div>
          <div aria-hidden="true" className="mt-4 w-full rounded-lg bg-[#17221e] py-2.5 text-center text-[10px] font-semibold text-white">{t.payNow} {formatMoney('€93.90', t.overview === 'Vue d’ensemble' ? 'fr' : 'en')}</div>
        </div>
      </Panel>
      <div className="space-y-3">
        <Panel title={t.paymentMethods}><div className="space-y-2 text-[10px]"><div className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2.5"><span className="flex h-5 w-8 items-center justify-center rounded bg-blue-500/20 text-[8px] font-bold text-blue-200">VISA</span><span className="text-slate-300">Card payments</span><span className="ml-auto text-emerald-300">●</span></div><div className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2.5"><span className="flex h-5 w-8 items-center justify-center rounded bg-sky-500/20 text-[8px] font-bold text-sky-200">PP</span><span className="text-slate-300">PayPal</span><span className="ml-auto text-emerald-300">●</span></div><div className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2.5"><span className="flex h-5 w-8 items-center justify-center rounded bg-slate-500/20 text-[8px] font-bold text-slate-200">AP</span><span className="text-slate-300">Apple Pay</span><span className="ml-auto text-emerald-300">●</span></div></div></Panel>
        <Panel title={t.checkoutRate}><div className="flex items-center gap-4"><div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-violet-400/70 border-r-cyan-300/70"><span className="text-sm font-semibold text-white">13.8%</span></div><p className="max-w-[150px] text-[10px] leading-relaxed text-slate-400">{t.checkoutNote}</p></div></Panel>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 text-[10px] text-emerald-200"><FaCheck size={10} />{t.published}</span>
      </div>
    </div>
  );
}

export default function DashboardPreview({ project, screen, labels: t }: { project: ProjectKey; screen: ScreenKey; labels: ShowcaseLabels }) {
  const isFrench = t.overview === 'Vue d’ensemble';
  const navigation = project === 'dashpsp'
    ? [t.navOverview, t.navPayments, t.connectors, t.navRevenue]
    : project === 'oneclick'
      ? [t.navOverview, t.checkout, t.navOrders, t.navStores]
      : [t.navOverview, t.navOrders, t.navProducts, t.navPayments, t.navStores];
  const appName = project === 'ownaris' ? t.ownaris : project === 'dashpsp' ? t.dashpsp : t.oneclick;
  const screenTitle = screen === 'connectors' ? t.connectors : screen === 'orders' ? t.orders : screen === 'checkout' ? t.checkout : t.overview;

  return (
    <div className="flex h-[60vh] min-h-[410px] max-h-[650px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0c12] md:h-[66vh]">
      <aside className="hidden w-48 shrink-0 flex-col border-r border-white/[0.07] bg-[#0d1018] md:flex xl:w-52">
        <div className="flex h-14 items-center gap-2 border-b border-white/[0.06] px-4"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-[10px] font-bold text-slate-950">{appName.slice(0, 1)}</span><span className="truncate text-xs font-semibold text-white">{appName}</span></div>
        <div className="border-b border-white/[0.06] p-3"><div className="rounded-lg bg-white/[0.045] px-2.5 py-2"><p className="truncate text-[10px] font-medium text-slate-200">Atelier Nova</p><p className="mt-1 text-[9px] text-slate-500">{t.sampleWorkspace}</p></div></div>
        <nav className="space-y-1 p-2.5">
          {navigation.map((item, index) => {
            const active = item === screenTitle || (screen === 'overview' && index === 0);
            return <div key={item} className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[10px] ${active ? 'bg-cyan-400/10 font-medium text-cyan-200' : 'text-slate-500'}`}><span className={`h-1.5 w-1.5 rounded-sm ${active ? 'bg-cyan-300' : 'bg-slate-700'}`} />{item}</div>;
          })}
        </nav>
        <div className="mt-auto p-3"><div className="rounded-lg border border-white/[0.06] p-2.5"><p className="text-[9px] text-slate-500">{t.account}</p><p className="mt-1 truncate text-[10px] text-slate-300">demo@atelier-nova.example</p></div></div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.07] px-3 md:h-14 md:px-5">
          <div className="min-w-0"><p className="truncate text-[10px] text-slate-500">{appName} <span className="px-1">/</span> {screenTitle}</p><p className="hidden truncate text-[9px] text-slate-600 md:block">{t.sampleWorkspace}</p></div>
          <div className="ml-2 flex shrink-0 items-center gap-2"><span className="hidden items-center gap-1 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-2 py-1 text-[8px] text-amber-200 sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />SANDBOX</span><span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400/20 text-[9px] font-semibold text-violet-200">AN</span></div>
        </header>
        <div className="flex-1 overflow-auto p-3 md:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><h3 className="font-display text-base font-semibold text-white md:text-lg">{screenTitle}</h3><p className="mt-1 text-[9px] text-slate-500">{t.updated} · {t.snapshotDate}</p></div><span className="rounded-md border border-white/[0.07] px-2 py-1 text-[9px] text-slate-400">{isFrench ? '30 derniers jours' : 'Last 30 days'}⌄</span></div>
          {screen === 'connectors' ? <ConnectorsScreen labels={t} /> : screen === 'orders' ? <OrdersScreen labels={t} /> : screen === 'checkout' ? <CheckoutScreen labels={t} /> : <OverviewScreen labels={t} project={project} />}
        </div>
        <div className="border-t border-white/[0.06] px-3 py-1.5 text-center text-[8px] text-slate-600 md:px-5">{t.fictional}</div>
      </div>
    </div>
  );
}
