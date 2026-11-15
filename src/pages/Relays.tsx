import { useSeoMeta } from '@unhead/react';
import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  Database,
  Globe,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { SiteLayout } from '@/components/layout/SiteLayout';

type RelayTone = 'green' | 'cyan' | 'purple' | 'amber';

interface RelayCardProps {
  name: string;
  label: string;
  endpoint: string;
  description: string;
  details: string[];
  tone: RelayTone;
  icon: React.ReactNode;
}

const toneClasses: Record<RelayTone, { border: string; icon: string; label: string; glow: string }> = {
  green: {
    border: 'border-[#00ff9f]/20 hover:border-[#00ff9f]/40',
    icon: 'text-[#00ff9f]',
    label: 'text-[#00ff9f]/70 border-[#00ff9f]/20 bg-[#00ff9f]/5',
    glow: 'bg-[#00ff9f]/[0.04]',
  },
  cyan: {
    border: 'border-[#00ffff]/20 hover:border-[#00ffff]/40',
    icon: 'text-[#00ffff]',
    label: 'text-[#00ffff]/70 border-[#00ffff]/20 bg-[#00ffff]/5',
    glow: 'bg-[#00ffff]/[0.04]',
  },
  purple: {
    border: 'border-purple-400/20 hover:border-purple-400/40',
    icon: 'text-purple-300',
    label: 'text-purple-300/80 border-purple-400/20 bg-purple-400/5',
    glow: 'bg-purple-400/[0.04]',
  },
  amber: {
    border: 'border-amber-400/20 hover:border-amber-400/40',
    icon: 'text-amber-300',
    label: 'text-amber-300/80 border-amber-400/20 bg-amber-400/5',
    glow: 'bg-amber-400/[0.04]',
  },
};

function RelayCard({ name, label, endpoint, description, details, tone, icon }: RelayCardProps) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const colors = toneClasses[tone];

  const copyEndpoint = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2600);
    }
  };

  return (
    <article className={`relative overflow-hidden rounded-lg border bg-white/[0.015] transition-colors ${colors.border}`}>
      <div className={`absolute inset-0 pointer-events-none ${colors.glow}`} />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 shrink-0 rounded-lg border border-current/20 bg-black/40 flex items-center justify-center ${colors.icon}`}>
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <span className={`px-2 py-0.5 rounded border text-[9px] font-mono uppercase tracking-wider ${colors.label}`}>
                {label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">{description}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mb-2">Relay endpoint</p>
          <div className="flex items-center gap-2 p-3 rounded border border-white/10 bg-black/60">
            <code className="min-w-0 flex-1 break-all font-mono text-xs sm:text-sm text-white/80">{endpoint}</code>
            <button
              type="button"
              onClick={copyEndpoint}
              aria-label={`Copy ${name} endpoint`}
              className="shrink-0 p-2 rounded border border-white/10 text-white/45 hover:text-[#00ff9f] hover:border-[#00ff9f]/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-[#00ff9f]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copyFailed && (
            <p className="mt-2 text-[10px] font-mono text-amber-300/70">Copy was blocked by your browser. Select the endpoint text to copy it manually.</p>
          )}
        </div>

        <ul className="mt-5 space-y-2">
          {details.map((detail) => (
            <li key={detail} className="flex items-start gap-2 text-xs leading-relaxed text-white/40">
              <span className={`mt-0.5 font-mono ${colors.icon}`}>&gt;</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Relays() {
  useSeoMeta({
    title: '0xPrivacy Relays - Nostr Infrastructure',
    description: 'Connect to 0xPrivacy Nostr relays: the SIP-01 relay, public free relay, primary member relay, and experimental Tor-only Citrine relay.',
  });

  return (
    <SiteLayout>
      <section className="relative pt-14 pb-10 border-b border-[#00ff9f]/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#00ff9f]/[0.045] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-[#00ff9f]/60" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#00ff9f]/50">// 0xprivacy network</p>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Nostr <span className="text-[#00ff9f]">Relays</span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-white/45">
            Connect directly to the 0xPrivacy relay network. Choose the public relay for free access,
            the primary relay for member services, the dedicated SIP-01 endpoint for protocol infrastructure,
            or Citrine for experimental Tor-only access.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RelayCard
              name="SIP-01 Relay"
              label="Protocol relay"
              endpoint="wss://sip-relay.0xprivacy.online/"
              tone="cyan"
              icon={<Database className="w-5 h-5" />}
              description="Dedicated Nostr relay endpoint for the SIP-01 decentralized search-index ecosystem."
              details={[
                'For SIP-01-compatible indexers, crawlers, relays and clients that publish or consume SIP-01 events.',
                'This is relay infrastructure, not a search website or search API endpoint.',
                'Connect using a Nostr client or SIP-01 tool that supports custom relay URLs.',
              ]}
            />

            <RelayCard
              name="0xPrivacy Primary Relay"
              label="Member infrastructure"
              endpoint="wss://relay.0xprivacy.online/"
              tone="green"
              icon={<Server className="w-5 h-5" />}
              description="The primary 0xPrivacy relay and the main infrastructure destination for eligible cross-relay backup."
              details={[
                'Paid membership on this relay is the membership basis for the additional backup service described below.',
                'Use this endpoint alongside other relays rather than relying on a single relay for your Nostr identity.',
                'Keep your own signing keys backed up securely; relay copies do not recover a lost private key.',
              ]}
            />

            <RelayCard
              name="0xPrivacy Public Relay"
              label="Free · Public"
              endpoint="wss://relay2.0xprivacy.online"
              tone="purple"
              icon={<Globe className="w-5 h-5" />}
              description="The public free relay for the wider Nostr community. No paid membership is required to use this public endpoint."
              details={[
                'Paid members of the primary 0xPrivacy relay receive additional backup of eligible notes from this relay to the main infrastructure.',
                'Add it as an additional read/write relay in a compatible Nostr client.',
                'Public Nostr events remain public; use Nostr encryption for private message content.',
              ]}
            />

            <RelayCard
              name="Free Tor Citrine Relay"
              label="Experimental · Tor only"
              endpoint="ws://acuy3mjnv26tkyaaucndlxmg2ocntz4rtebhavk57vgruozm42iaznqd.onion"
              tone="amber"
              icon={<Smartphone className="w-5 h-5" />}
              description="A literal mobile-hosted Nostr node, exposed only as a Tor onion service. Free to use and intentionally experimental while the node is stress-tested."
              details={[
                'Requires a Tor-connected device and a Nostr client with Tor / onion-service support. It will not work through an ordinary clearnet-only client.',
                'Reported node resources: 24 GB RAM, 512 GB storage and an unmetered gigabit connection.',
                'Paid members of the primary 0xPrivacy relay receive additional backup of eligible notes from Citrine to the main infrastructure.',
                'Experimental mobile hosting means uptime and long-term event availability are not guaranteed.',
              ]}
            />
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[#00ff9f]/15 bg-[#00ff9f]/[0.025] p-5 sm:p-7">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0 text-[#00ff9f]/70 mt-0.5" />
              <div>
                <h2 className="text-base font-bold text-white">Extra backup across the relay network</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The 0xPrivacy service design provides an additional copy of eligible notes submitted through
                  the free public relay and the Tor Citrine relay to the primary relay infrastructure for users
                  with an active paid membership on the primary relay. This is an extra resilience layer, not
                  a replacement for keeping your private key safe or maintaining your own backups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-lg border border-white/10 bg-white/[0.01]">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-[#00ffff]/70" />
                <h2 className="font-bold text-white text-sm">Using the clearnet relays</h2>
              </div>
              <p className="text-xs leading-relaxed text-white/40">
                Copy a WSS endpoint and add it to your Nostr client as a relay. WSS connections use TLS in transit.
                For privacy, consider connecting over Tor where your client supports it; a public relay can still
                observe connection metadata and public events.
              </p>
            </div>
            <div className="p-5 rounded-lg border border-amber-400/15 bg-amber-400/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-300/80" />
                <h2 className="font-bold text-white text-sm">Citrine is experimental</h2>
              </div>
              <p className="text-xs leading-relaxed text-white/40">
                The onion relay is reachable only over Tor and requires a Tor-aware client. Tor protects the network
                path to the onion service, but it does not make public Nostr events private or guarantee that an
                operator cannot observe application-level metadata. Treat Citrine as a community test node, not
                your only copy of important events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
