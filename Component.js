class Component extends DCLogic {
    state = { g: 0, booked: false, mode: 'light', follow: true };

    FIELDS = [
        { label: 'APPLICANT', value: 'Laurier Transport Inc.', src: 'WEB' },
        { label: 'NIR / MC NO.', value: '2841177 · MC-884120', src: 'WEB' },
        { label: 'IN BUSINESS SINCE', value: '2013', src: 'WEB' },
        { label: 'VEHICLES · SEC 8', value: '6 units · $742K listed', src: 'FILE' },
        { label: 'DRIVERS · SEC 16', value: '5 · 0 demerit pts', src: 'FILE' },
        { label: 'LOSS EXP · SEC 17', value: '2 claims · $41K paid', src: 'WEB' },
        { label: 'NON-OWNED TRL · SEC 11', value: 'Max 4 · reefer · $60K avg', src: 'CALL' },
        { label: 'RADIUS · SEC 15', value: 'QC 60% · ON/NY 40%', src: 'CALL' },
        { label: 'CARGO · SEC 12–14', value: 'Electronics LTL · max $50K', src: 'CALL' }
    ];

    // Step 3/3 \u2014 the call, triggered ONLY because the two texts went
    // unanswered. It collects all three outstanding items.
    LINES = [
        { t: 64, who: 'agent', text: "Hi Maria \u2014 Ava for Northgate on Laurier's renewal. I texted a couple of times; catching you now to verify three underwriting items." },
        { t: 71, who: 'client', text: "Oh \u2014 sorry, missed those. Go ahead." },
        { t: 75, who: 'agent', text: "Section 11 \u2014 will you use non-owned trailers this term? How many under your care at once, and the average value?" },
        { t: 82, who: 'client', text: "Yes \u2014 interchange reefers. Never more than four at a time, about sixty thousand each." },
        { t: 88, who: 'agent', text: "Section 15, radius \u2014 what share of trips stays inside 160 kilometres, and do any lanes run past 1,440?" },
        { t: 95, who: 'client', text: "Sixty percent local Qu\u00e9bec; the rest Ontario and New York. Nothing past 1,440." },
        { t: 101, who: 'agent', text: "Last \u2014 Section 12: any electronics or high-theft goods, and the maximum value per load?" },
        { t: 107, who: 'client', text: "Occasional LTL electronics, capped at fifty thousand." },
        { t: 112, who: 'agent', text: "Confirmed. Underwriting receives the packet today \u2014 your broker follows up with terms." }
    ];

    // Step 2/3 \u2014 two outbound texts. The client does NOT reply; that
    // silence is exactly what escalates to the call in step 3.
    SMS = [
        { t: 37, who: 'agent', text: "Hi Maria \u2014 Ava with Northgate on Laurier's renewal. A couple of quick underwriting items left to finish it. Mind replying when you have a sec?" },
        { t: 46, who: 'agent', text: "Following up on my earlier note \u2014 still need those items to wrap your renewal. I'll give you a quick call if that's easier." }
    ];

    FILL_AT = [7, 10, 12, 17, 19, 13, 84, 97, 109];
    DOCS = [{ t: 17, name: 'registrations \u00d712' }, { t: 21, name: 'fuel-tax \u00d78' }, { t: 25, name: 'section-11.pdf' }, { t: 29, name: 'certs + policies \u00d79' }];
    FILE_CARDS = [
        { name: 'vehicle-registrations/ (12)', kind: 'DIR', chipBg: 'var(--amber)', fly: 12, count: 12 },
        { name: 'drivers-records/ (7)', kind: 'DIR', chipBg: 'var(--amber)', fly: 14, count: 7 },
        { name: 'fuel-tax-1Q\u20134Q-2025.pdf', kind: 'PDF', chipBg: '#B04A38', fly: 16, count: 8 },
        { name: 'ifta-reports-2025.pdf', kind: 'PDF', chipBg: '#B04A38', fly: 18, count: 1 },
        { name: 'trailers-section-11.pdf', kind: 'PDF', chipBg: '#B04A38', fly: 20, count: 1 },
        { name: 'cargo-list.png', kind: 'IMG', chipBg: '#4A6B8A', fly: 22, count: 1 },
        { name: 'certificates.zip', kind: 'ZIP', chipBg: 'var(--mut)', fly: 24, count: 6 },
        { name: 'prior-policy-2025.pdf', kind: 'PDF', chipBg: '#B04A38', fly: 26, count: 1 },
        { name: 'mid-term-changes.pdf', kind: 'PDF', chipBg: '#B04A38', fly: 28, count: 1 },
        { name: 'client-emails.msg', kind: 'MSG', chipBg: '#715C8A', fly: 30, count: 4 }
    ];
    WEB_CARDS = [
        { label: 'Website 1 \u00b7 registry', bar: 'var(--webbar1)', fly: 3 },
        { label: 'Website 2 \u00b7 fuel-tax portal', bar: 'var(--webbar2)', fly: 6 },
        { label: 'Website 3 \u00b7 prior carrier', bar: 'var(--webbar3)', fly: 9 }
    ];
    T_END = 118;
    T_LOOP = 134;

    TAIL = [
        { t: 2, time: 'TUE 10:42:07', actor: 'IN', text: 'email received \u00b7 6 attachments', delta: 'RECEIVED', dc: 'var(--amber)' },
        { t: 6, time: 'TUE 10:42:09', actor: 'AGENT', text: 'extraction + portal fetch started', delta: '+2 s', dc: 'var(--accent)' },
        { t: 20, time: 'TUE 10:42:31', actor: 'AGENT', text: 'file read \u00b7 3 items missing (Sec 11 \u00b7 12 \u00b7 15)', delta: '+22 s', dc: 'var(--accent)' },
        { t: 33, time: 'TUE 10:42:49', actor: 'SYSTEM', text: 'application drafted \u00b7 6/9 fields \u00b7 each cited', delta: '+18 s', dc: 'var(--accent)' },
        { t: 37, time: 'TUE 10:42:53', actor: 'AGENT', text: 'text \u2192 Maria \u00b7 3 items \u00b7 consent logged', delta: '+4 s', dc: 'var(--accent)' },
        { t: 44, gap: true, label: 'NO REPLY \u2014 HELD OVERNIGHT' },
        { t: 46, time: 'WED 09:00:00', actor: 'AGENT', text: 'follow-up text \u00b7 sent in business hours', delta: 'HELD \u2713', dc: 'var(--amber)' },
        { t: 56, gap: true, label: 'NO REPLY \u00b7 1 MORE DAY' },
        { t: 64, time: 'THU 11:30:04', actor: 'AGENT', text: 'call \u2192 Maria \u00b7 connected', delta: '3RD TOUCH', dc: 'var(--accent)' },
        { t: 112, time: 'THU 11:34:41', actor: 'SYSTEM', text: 'packet submit-ready \u2192 your review', delta: '\u0394 2 DAYS', dc: 'var(--accent)' }
    ];

    FILL_LOOP = 58;
    FILL_DOCS = [
        { name: 'drivers-records/ (7)', share: 3 },
        { name: 'vehicle-registrations/ (12)', share: 6 },
        { name: 'fuel-tax-1q\u20134q-2025.pdf', share: 9 },
        { name: 'ifta-report-2025.pdf', share: 12 },
        { name: 'trailers-section-11.pdf', share: 15 },
        { name: 'cargo-list.png', share: 18 },
        { name: 'prior-policy-2025.pdf', share: 21 },
        { name: 'mid-term-changes.pdf', share: 23 },
        { name: 'loss-runs-2021-25.pdf', share: 26 },
        { name: 'renewal-proposal-2026.pdf', share: 29 },
        { name: 'client-emails.msg', share: 31 },
        { name: '+ 21 more', share: 34 }
    ];
    FILL_FIELDS = [
        { label: 'LEGAL NAME', value: 'Laurier Transport Inc.', src: 'client-docs' },
        { label: 'DOT / NIR \u2116', value: '2841177', src: 'registrations' },
        { label: 'POWER UNITS', value: '18', src: 'registrations' },
        { label: 'TRAILERS', value: '22 \u00b7 dry van, reefer', src: 'section-11' },
        { label: 'DRIVERS / AVG EXP', value: '21 / 9.5 yrs', src: 'drivers-records' },
        { label: 'RADIUS', value: 'Interprovincial \u2264 800 km', src: 'ifta-reports' },
        { label: 'ANNUAL MILEAGE', value: '2.1M km', src: 'fuel-tax' },
        { label: 'CARGO', value: 'General freight \u00b7 no hazmat', src: 'cargo-list' },
        { label: 'PRIOR CLAIMS \u00b7 5 YRS', value: '2 \u00b7 $41K paid', src: 'loss-runs' }
    ];

    // Contact details are base64-encoded in source and decoded only at render
    // time, so a plain-text/regex scraper reading the page HTML finds nothing
    // — real users and screen readers still get normal tel:/mailto: links.
    _decode(b64) { return atob(b64); }

    // Cross-page links (e.g. Contact.dc.html -> "Starlight Landing.dc.html#platform") land here
    // with a #hash before this component has finished its first mount, so the browser's
    // native scroll-to-anchor fires too early and misses. Retry until the target exists.
    _scrollToHash() {
        const hash = window.location.hash;
        if (!hash) return;
        const headerOffset = 82;
        const attempt = (triesLeft) => {
            let el = null;
            try { el = document.querySelector(hash); } catch (e) { el = null; }
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            } else if (triesLeft > 0) {
                setTimeout(() => attempt(triesLeft - 1), 100);
            }
        };
        attempt(30);
    }

    _applyMode(mode) {
        try { document.documentElement.dataset.mode = mode; } catch (e) { }
        this.setState({ mode });
    }

    componentDidMount() {
        this._scrollToHash();
        let saved = null;
        try { saved = localStorage.getItem('bw-mode'); } catch (e) { }
        if (saved === 'dark' || saved === 'light') this._applyMode(saved);
        this._offscreen = false;
        if (typeof IntersectionObserver !== 'undefined') {
            if (this._io) this._io.disconnect();
            this._io = new IntersectionObserver((entries) => {
                this._offscreen = entries[0] ? !entries[0].isIntersecting : false;
            }, { threshold: 0.1 });
            this._observedDemo = false;
        }
        if (this._iv) clearInterval(this._iv);
        const autoplay = this.props.demoAutoplay !== false;
        if (autoplay) this._iv = setInterval(() => {
            if (this._offscreen) return;
            if (this._holdUntil && Date.now() < this._holdUntil) return;
            this.setState(s => ({ g: s.g + 1 }));
        }, 250);
    }

    componentWillUnmount() {
        if (this._iv) clearInterval(this._iv);
        if (this._io) this._io.disconnect();
    }

    componentDidUpdate() {
        const el = this._tref && this._tref.current;
        if (el) el.scrollTop = el.scrollHeight;
        if (this._io && !this._observedDemo && this._demoRef && this._demoRef.current) {
            this._observedDemo = true;
            this._io.observe(this._demoRef.current);
        }
        const tail = this._tailRef && this._tailRef.current;
        if (tail && this.state.follow) {
            tail.scrollTop = tail.scrollHeight;
        }
    }

    renderVals() {
        const t = this.state.g % this.T_LOOP;
        const ft = this.state.g % this.FILL_LOOP;
        if (!this._tref) this._tref = React.createRef();
        if (!this._tailRef) this._tailRef = React.createRef();
        if (!this._demoRef) this._demoRef = React.createRef();
        const done = t >= this.T_END;

        const phone = this._decode('KzEzMTIyMDAxOTky'); // +13122001992
        const phoneDisplay = this._decode('KzEgKDMxMikgMjAwLTE5OTI='); // +1 (312) 200-1992
        const emailHello = this._decode('aGVsbG9AZ2V0c3RhcmxpZ2h0LmFp'); // hello@getstarlight.ai
        const emailSupport = this._decode('c3VwcG9ydEBnZXRzdGFybGlnaHQuYWk='); // support@getstarlight.ai
        const phoneHref = 'tel:' + phone;
        const emailHelloHref = 'mailto:' + emailHello;
        const emailSupportHref = 'mailto:' + emailSupport;

        const phase2 = t >= 35; // phone on screen (text thread first, then call)
        const callPhase = t >= 60;
        const textPhase = phase2 && !callPhase;
        const phaseLabel = callPhase ? 'AI CLIENT CALL \u00b7 STEP 3/3' : phase2 ? 'CLIENT TEXT THREAD \u00b7 STEP 2/3' : 'AUTONOMOUS FETCH \u00b7 STEP 1/3';

        const webCards = this.WEB_CARDS.map((w, i) => {
            const flying = t >= w.fly;
            return {
                label: w.label, bar: w.bar,
                left: flying ? '60%' : '4%',
                top: flying ? '80px' : (46 + i * 52) + 'px',
                transform: flying ? 'rotate(0deg) scale(0.1)' : 'rotate(' + ((i % 2 ? 1 : -1) * 1.2) + 'deg) scale(1)',
                opacity: flying ? 0 : 1
            };
        });
        let flownCount = 0;
        const fileCards = this.FILE_CARDS.map((fc, i) => {
            const flying = t >= fc.fly;
            if (flying) flownCount += fc.count;
            return {
                name: fc.name, kind: fc.kind, chipBg: fc.chipBg,
                left: flying ? '60%' : (3 + (i % 2) * 4) + '%',
                top: flying ? '95px' : (204 + i * 23) + 'px',
                transform: flying ? 'rotate(0deg) scale(0.12)' : 'rotate(' + ((i % 2 ? 1 : -1) * (1 + i * 0.5)) + 'deg) scale(1)',
                opacity: flying ? 0 : 1
            };
        });
        const pileCount = 42 - flownCount;

        const caption = this.LINES.filter(l => t >= l.t).pop();
        const capAgent = !!(caption && caption.who === 'agent');
        const agentSpeaking = capAgent && (t - caption.t) < 10 && !done;
        const connected = t >= 64;
        const callSec = connected ? Math.min(59, Math.floor((t - 64) * 0.25 * 2.5)) : 0;
        const callState = !callPhase ? '' : done ? 'CALL COMPLETE \u2713' : !connected ? 'RINGING\u2026' : '\u25cf 0:' + String(callSec).padStart(2, '0');

        const smsList = this.SMS.filter(m => t >= m.t).map(m => ({
            text: m.text,
            justify: m.who === 'agent' ? 'flex-end' : 'flex-start',
            bg: m.who === 'agent' ? 'var(--accent)' : 'rgba(255,255,255,0.09)',
            color: m.who === 'agent' ? 'var(--on-accent)' : '#D8E4DC',
            radius: m.who === 'agent' ? '12px 12px 3px 12px' : '12px 12px 12px 3px'
        }));

        let filledCount = 0;
        const fields = this.FIELDS.map((f, i) => {
            const at = this.FILL_AT[i];
            const filled = t >= at;
            if (filled) filledCount++;
            const fresh = filled && (t - at) < 5;
            return {
                label: f.label,
                display: filled ? f.value : '—',
                src: filled ? f.src : false,
                color: filled ? 'var(--ink)' : 'var(--empty)',
                weight: filled ? 600 : 400,
                bg: fresh ? 'var(--tintg)' : 'transparent'
            };
        });

        const docs = this.DOCS.filter(d => t >= d.t).map(d => d.name);
        const progressPct = Math.round(100 * (filledCount + docs.length) / (this.FIELDS.length + this.DOCS.length)) + '%';

        const shownSec = done ? 58 : Math.min(58, Math.floor(t * 0.25 * 2.5));
        const timerText = '00:' + String(shownSec).padStart(2, '0');

        const TAIL_STYLE = {
            'IN': { color: 'var(--amber)', border: 'var(--amberline)' },
            'CLIENT': { color: 'var(--amber)', border: 'var(--amberline)' },
            'AGENT': { color: 'var(--accent)', border: 'var(--tintgb)' },
            'SYSTEM': { color: 'var(--mut)', border: 'var(--line)' }
        };
        const tailRows = this.TAIL.filter(r => t >= r.t).map(r => {
            if (r.gap) return { isGap: true, isRow: false, label: r.label };
            const fresh = (t - r.t) < 5;
            const a = TAIL_STYLE[r.actor];
            return {
                isGap: false, isRow: true,
                time: r.time, actor: r.actor, text: r.text, delta: r.delta,
                deltaColor: r.dc, actorColor: a.color, actorBorder: a.border,
                bg: fresh ? 'var(--tintg)' : 'transparent'
            };
        });

        const dm = this.props.delegationMode ?? 'plan';

        const chipOn = { bg: 'var(--tintg)', color: 'var(--accent)', border: 'var(--tintgb)' };
        const chipOff = { bg: 'transparent', color: 'var(--mut)', border: 'var(--line2)' };
        const pF = t < 35 ? chipOn : chipOff;
        const pT = (t >= 35 && t < 60) ? chipOn : chipOff;
        const pC = t >= 60 ? chipOn : chipOff;
        const seek = (offset) => {
            this._holdUntil = 0;
            this.setState(s => ({ g: Math.floor(s.g / this.T_LOOP) * this.T_LOOP + offset, follow: true }));
        };

        const scanned = ft < 6 ? 0 : Math.min(34, Math.ceil((ft - 6) * 34 / 12));
        const fillDocs = this.FILL_DOCS.map(d => {
            const on = scanned >= d.share;
            return {
                name: d.name, mark: on ? '\u2713 ' : '',
                border: on ? 'var(--tintgb)' : 'var(--line2)',
                bg: on ? 'var(--tintg2)' : 'var(--panel)',
                color: on ? 'var(--accent)' : 'var(--mut)'
            };
        });
        const fillFields = this.FILL_FIELDS.map((f, i) => {
            const at = 16 + i * 2.5;
            const filled = ft >= at;
            const fresh = filled && (ft - at) < 4;
            return {
                label: f.label,
                display: filled ? f.value : '\u2014',
                src: filled ? f.src : false,
                color: filled ? 'var(--ink)' : 'var(--empty)',
                weight: filled ? 600 : 400,
                bg: fresh ? 'var(--tintg)' : 'transparent'
            };
        });
        const fillDone = ft >= 40;
        const fieldCount = fillDone ? 142 : Math.round(142 * Math.max(0, Math.min(1, (ft - 16) / 22)));
        const fillSec = Math.max(0, Math.min(9.4, (ft - 6) * 9.4 / 34)).toFixed(1);
        const fillActive = ft >= 6 && !fillDone;

        return {
            fields, docs, progressPct, timerText, phaseLabel,
            fileCards, webCards, pileCount, pileOpacity: phase2 ? 0 : 1,
            docLeft: phase2 ? '4%' : '55%', docWidth: phase2 ? '46%' : '42%',
            docBorder: fields.some(f => f.bg !== 'transparent') ? '#8FC7A8' : 'var(--line)',
            phoneTransform: phase2 ? 'translateY(0)' : 'translateY(130%)',
            phoneOpacity: phase2 ? 1 : 0,
            ringing: callPhase && !connected,
            callState, agentSpeaking,
            textMode: textPhase, callMode: callPhase,
            phoneModeLabel: callPhase ? 'OUTBOUND \u00b7 SECURE LINE' : 'MESSAGES \u00b7 SMS',
            smsList,
            smsWaiting: textPhase && t >= 40,
            smsStatus: t >= 54 ? '\u26a0 NO REPLY TO 2 TEXTS \u2014 ESCALATING TO CALL' : t >= 49 ? 'FOLLOW-UP SENT \u00b7 DELIVERED \u2713\u2713' : 'DELIVERED \u2713\u2713',
            smsColor: t >= 54 ? '#E8C87E' : '#6E8477',
            hasCaption: callPhase && !!caption,
            captionTag: capAgent ? 'AVA \u00b7 AI AGENT' : 'MARIA',
            captionTagColor: capAgent ? '#8FC7A8' : '#E8C87E',
            captionText: caption ? caption.text : '',
            fillDocs, fillFields, fillActive, fillIdle: !fillActive,
            fillScanned: scanned + '/34',
            fieldCount: fieldCount + '/142',
            fillTimer: fillSec + ' s',
            fillStatus: ft < 6 ? 'QUEUED' : ft < 18 ? 'READING PAGES\u2026' : ft < 40 ? 'MAPPING FIELDS\u2026' : 'DONE',
            fillStatusColor: fillDone ? '#8FC7A8' : '#E8C87E',
            fillStampOpacity: fillDone ? 1 : 0,
            fillStampScale: fillDone ? 1 : 1.4,
            mlScan: !phase2,
            mlFlown: flownCount,
            phoneHref, phoneDisplay, emailHelloHref, emailHello, emailSupportHref, emailSupport,
            stampOpacity: done ? 1 : 0,
            stampScale: done ? 1 : 1.4,
            transcriptRef: this._tref,
            replay: () => this.setState({ g: 0 }),
            tailRows,
            tailRef: this._tailRef,
            demoRef: this._demoRef,
            onTailScroll: (e) => {
                const el = e.target;
                const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 6;
                if (atBottom) {
                    this._holdUntil = 0;
                    if (!this.state.follow) this.setState({ follow: true });
                } else {
                    this._holdUntil = Date.now() + 2500;
                    if (this.state.follow) this.setState({ follow: false });
                }
            },
            backToLive: () => {
                this._holdUntil = 0;
                this.setState({ follow: true });
            },
            showLiveChip: !this.state.follow,
            goFetch: () => seek(0),
            goText: () => seek(35),
            goCall: () => seek(60),
            chipFBg: pF.bg, chipFColor: pF.color, chipFBorder: pF.border,
            chipTBg: pT.bg, chipTColor: pT.color, chipTBorder: pT.border,
            chipCBg: pC.bg, chipCColor: pC.color, chipCBorder: pC.border,
            toggleMode: () => {
                const m = this.state.mode === 'dark' ? 'light' : 'dark';
                try { localStorage.setItem('bw-mode', m); } catch (e) { }
                this._applyMode(m);
            },
            modeIcon: this.state.mode === 'dark' ? '☀' : '☾',
            modeTitle: this.state.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
            dmManual: dm === 'manual',
            dmAccept: dm === 'accept-edits',
            dmPlan: dm === 'plan',
            dmAuto: dm === 'auto',
            showBar: this.props.announcementBar !== false,
            isHeroDefault: (this.props.heroHeadline ?? 'done-in-seconds') !== 'ai-team',
            isHeroAlt: (this.props.heroHeadline ?? 'done-in-seconds') === 'ai-team',
            booked: this.state.booked,
            notBooked: !this.state.booked,
            onBook: (e) => { e.preventDefault(); this.setState({ booked: true }); }
        };
    }
}