/*!






 __  __                                                  ____                             
|  \/  |   __ _  __  __   ___   _ __     ___    ___     / ___|   __ _   _ __ ___     __ _ 
| |\/| |  / _` | \ \/ /  / _ \ | '_ \   / __|  / _ \   | |  _   / _` | | '_ ` _ \   / _` |
| |  | | | (_| |  >  <  |  __/ | | | | | (__  |  __/   | |_| | | (_| | | | | | | | | (_| |
|_|  |_|  \__,_| /_/\_\  \___| |_| |_|  \___|  \___|    \____|  \__,_| |_| |_| |_|  \__,_|
    





*/

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Calendar = e()
}(this, (function() {
    "use strict";
    const Gs = new Map,
        Zs = new Set;
    function Js(t, e) {
        let i = Gs.get(t);
        return i || (i = e(), Gs.set(t, i), Zs.add(i)), i
    }
    const Qs = (t, e, i) => {
        const s = ct(e, i);
        void 0 !== s && t.add(s)
    };
    const Ks = (a) => {
        a.lang = a.lang || "en"
        return a
    }
    const Ns = (a) => {
        for(var i = 0; i < a.length; i++) {
            let e = a[i];
            e.dayc = e.dayc.sort(function(a, b) { 
                return a.start - b.start;
            });
        }
        return a
    }
    class tn {
        constructor(t)
        {
            if (!t.data)
                throw Error("Missing data, make sure to add data first.");
            this._config = function(t) {
                return (t = t || {}).options = Ks(t.options) || {}, t.data = Ns(t.data), t
            }(t),
            this._scopeCache = new Map
        }
        get data()
        {
            return this._config.data
        }
        set data(t)
        {
            this._config.data = t
        }
        get options()
        {
            return this._config.options
        }
    }
    var dataErrorHandler = (a, b) => {
        let error = Me("h1", "error-handl", {in: b});
    
        a.innerHTML = "";
        Md(a, error);
    };

    var wK = function(a) {
        let b = a.timeSet || {}
        a.timeSet = {
            start: b.start || 8,
            end: b.end || 18,
            gap: b.gap || 1
        }
    },
    tK = function(a) {
        a.colorsTheme || {
            col :{
                major: "#7751d9",
                minor: "#eee8ff"
            },
            prv: {
                major: "#2eb3e4",
                minor: "#e2f4ff"
            }
        }
    },
    je = function(a) {
        return "string" == typeof a
    }
    var Me = function(a, b, c) {
        return Le(document, arguments)
    },
    Le = function(a, b) {
        var c = String(b[0]),
            d = b[1],
            e = b[2] || null;
        c = a.createElement(c);
        if (e && e.in) c.innerHTML = e.in;

        b && (d && typeof e !== "object" && !je(d) ? Ne(c, d, e) : (e && e.type ? c.setAttribute(e.type, d) : d && (c.className = d)));
        return c
    },
    Ne = function(b, c, d) {
        function e(h, i) {
            b.setAttribute(h, i);
        }
        for (var i = 0; i < Math.min(c.length, d.length); i++) {
            e(c[i], d[i]);
        }
    },
    Mc = function(a, b) {
        a.classList.add(b);
    },
    Mr = function(a, b) {
        a.classList.remove(b);
    },
    Ms = function(a, b, c) {
        je(b) ? a.setAttribute(b, c !== undefined ? c : "") : Ne(a, b, c)
    },
    Md = function(a, b) {
        (b.length > 1) ? dj(a, b) : a.appendChild(b);
        return a
    },
    dj = function(a, b) {
        for(var i = 0; i < b.length; i++) 
            a.appendChild(b[i]);
    },

    getFebDays = function(year) {
        return isLeapYear(year) ? 29 : 28
    },
    
    isLeapYear = function(year) {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
    },

    daysOfMonth = function(a) {
        return [31, getFebDays(a.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },
    
    aspect = function(a) {
        return a > 600 ? a < 900 ? 0.9 : 1.3 : 0.5
    },

    size = function(a) {
        return a.clientWidth
    }

    class fn {
        constructor(t, e) {
            const s = this.config = new tn(e);
            this.options = s._config.options,
            this.root = t,
            this.daysName = {long: {"en": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                    "fr": ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']},
                            short: {"en": ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                                    "fr": ['L', 'M', 'M', 'J', 'V', 'S', 'D']}}
            wK(this.options);
            tK(this.options);

            var u = this.configure(this.options);
            var g = this.grid = new Grid(t, u, s.data).drawGrid();
        }
        configure(a) {
            a && (a.days = this.langDay(), a.ages = this.ages(), a.levels = this.levels(), a.courses = this.courses(), a.uniHeight = this.uniHeight())
            return a
        }
        lang_sel(arr, key) {
            return arr[key]
        }
        langDay() {
            return this.lang_sel(this.daysName[size(this.root) > 600 ? "long" : "short"], this.options.lang)
        }
        ages() {
            return this.lang_sel({"en": ["All ages", "Child", "Teen", "Adult"], "fr": ["Tout âge", "Enfant", "Ado", "Adulte"]}, this.options.lang)
        }
        levels() {
            return this.lang_sel({"en": ["All levels", "Beginner", "Intermediate", "Advanced"], "fr": ["Tous niveaux", "Débutant", "Intermédiaire", "Confirmé"]}, this.options.lang)
        }
        courses() {
            return this.lang_sel({"en": ["Collective course", "Private course"], "fr": ["Cours collectif", "Cours privé"]}, this.options.lang)
        }
        uniHeight() {
            return size(this.root) > 600 ? 100 : 50
        }
        error() {
            return this.lang_sel({"en": "An error occurred while loading the schedule, please try again later.", "fr": "Une erreur s'est produite lors du chargement du planning, veuillez réessayer ultérieurement."}, this.options.lang)
        }
        dataError() {
            return dataErrorHandler(this.root, this.error())
        }
    }
    var Grid = function(a, b, c) {
        this.today = new Date(),
        this.root = a,
        this.data = c,
        this.options = b;
    };
    var g = Grid.prototype;
    g.drawGrid = function() {
        let t = Days(this.today);
        this.gridHead(t), this.gridBody(t);
    };
    g.gridHead = function(w) {
        var td = this.today.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        let a = Me("div", "cal-top"),
            c = Me("div", "cal-tp-c"),
            u = Me("div", "cal-tp-br"),
            i = Me("div", "cal-root-mob-pop");
        Md(this.root, i);
        this.rootPop = i;

        headDaysRow(this, w, td, c);
        
        (size(this.root) < 600) && smallGesture(a);

        Md(this.root, Md(a, [u, c]));
        // _.gridB(content, w, b)
    };
    g.gridBody = function(w) {
        let a = Me("div", "cal-grid-bd scroll-shadow-btm"),
            b = Me("div", "cal-grid-bd-c"),
            c = Me("div", "cal-grid-bd-cp"),
            l = Me("div", "cal-grid-lp"),
            r = Me("div", "cal-grid-rp"),
            s = Me("div", "cal-grid-rp-c"),
            st = 8,
            timeSet = this.options.timeSet,
            start = (timeSet.start >= 0 ? timeSet.start : 0),
            end = (timeSet.end < 24 ? timeSet.end : 23),
            duration = end-start+2,
            days = 7;
        (duration < 24 || (duration = 23));

        datesColumn(l, st, duration, timeSet, this), gridPatern(s, days, duration, timeSet, this), scrollShadow(b, a);
        
        Md(this.root, Md(a, Md(b, Md(c, [l, Md(r, s)]))));
    
        // _.initMobileGrid();
        // _.desktop() ? _.deskFpopup() : _.mobFpopup();
    };
    var headDaysRow = function(a, n, m, o) {
        for(var x = 0; x < n.week.length; x++) {
            var b = Me("div", x, {type: "day"}),
                d = Me("div", "cal-tpd-c");
            Mc(b, "cal-tp-day")
            if (m == x && !n.nextWeek) Mc(b, "cal-curr-day");
            Md(o, Md(b, Md(d, [Me("H3", "cal-tp-day-tt", {in: a.options.days[x]}), Me("H2", "cal-tp-day-nb", {in: n.week[x]})])));
        }
    },
    smallGesture = function(a) {
        let n = Me("div", "cal-tp-mob-day-btn cal-btn-left"),
            m = Me("div", "cal-tp-mob-day-btn cal-btn-right");
        Md(a, [n, m]);
        [n,m].forEach((e,i) => {
            e.onclick = () => {
                // _.mobSlidingDay(i)
                console.log("days change", i);
            }
        });
    },
    datesColumn = function(n, m, o, p, q) {
        for(var x = 0; x < o; x+=p.gap) {
            let dn = Me("div", "cal-grid-dn"),
                dt = Me("p", "cal-grid-dn-t", x>0 && {in: ((m+x-1 >= 10 ? m+x-1 : '0'+(m+x-1)) + ":00")});
            
            dn.style.height = q.options.uniHeight+"px";
            Md(n, Md(dn, dt));
        }
    },
    gridPatern = function(n, m, o, p, q) {
        for(var y = 0; y < m; y++) {
            let d = Me("div", "cal-grid-el-pr"),
                un = Me("div", "cal-line-r-c");
            Ms(d, "cal-line-index", y);

            linePatern(o, p, q, d);
            q.data.length && (createEvents(q, un, q.data[y], getElementsIndex(q.data[y].dayc)))
            // _.addRElement(un, content[y], dates[y], y);
            Md(n, Md(d, un));
        }
    },
    linePatern = function(n, m, o, p) {
        for(var x = 0; x < n; x+=m.gap) {
            let dy = Me("div", "cal-grid-el-in");
            Ms(dy, "cal-col-index", x);
            if (x == n-m.gap) Ms(dy, "cal-col-last");
            dy.style.setProperty("--cal-el-uniheight", o.options.uniHeight+"px");
            Md(p, dy);
        }
    },
    scrollShadow = function(e, l) {
        e.onscroll = () => {
            if (e.scrollHeight-e.clientHeight <= e.scrollTop)
                Mr(l, "scroll-shadow-mdl"), Mc(l, "scroll-shadow-top");
            else if (0 >= e.scrollTop)
                Mr(l, "scroll-shadow-mdl"), Mc(l, "scroll-shadow-btm");
            else
                Mr(l, "scroll-shadow-top"), Mr(l, "scroll-shadow-btm"), Mc(l, "scroll-shadow-mdl");
        }
    },
    createEvents = function(a, b, c, d) {
        let t = Days(a.today),
            n = a.events = [],
            m = c.dayc;
        for(var i = 0; i < m.length; i++) {
            let evt = new Event(b, a, m[i], c.dayid, t, i);
            evt.drawEvent(d[i]);
            Md(b, evt.grt());
            n.push(evt);
        }
        // console.log(n);
    }

    var Event = function(a, b, c, d, e, f) {
        this.t = e,
        this.root = a,
        this.container = b,
        this.options = b.options,
        this.height = b.options.uniHeight,
        this.content = c,
        this.id = d,
        this.y = f,
        this.element = Me("div", "cal-grid-rdv-el");
    };
    var e = Event.prototype;
    e.grt = function() {
        return this.element
    };
    e.drawEvent = function(a) {
        // console.log(this.content);
        let e = this.options,
            f = this.content,
            t = this.height,
            n = this.element,
            m = Me("div", "cal-grid-rdv-el-in"),
            o = Me("div"),
            w = Me("div"),
            x = this.root,
            topPlacement = this.eventTopOffset(f),
            startOff = this.eventOffset(f, this.height),
            lengthrdv = this.eventLength(f),
            lm = Me("h3", "cal-r-tt", {in: e.courses[f.txt]});
        Md(o, lm),
        this.addDetails(lengthrdv, f, w, lm, o),
        Md(o, inn(f)),
        this.addPropreties(f, lengthrdv, topPlacement, startOff, t, a),
        Md(n, Md(m, o)),
        this.availability(f, this.id, n);
        n.onmouseover = () => {
            Mc(x, "cal-grid-el-over");
            Mc(n, "cal-grid-el-overed");
        }
        n.onmouseout = () => {
            Mr(x, "cal-grid-el-over");
            Mr(n, "cal-grid-el-overed");
        }
    };
    e.eventTopOffset = function(a) {
        return parseInt(a.start.slice(0, 2)) - 7
    };
    e.eventOffset = function(a, b) {
        return (b / 60 * parseInt(a.start.slice(2)))
    };
    e.eventLength = function(a) {
        return ((parseInt(a.end.slice(0, 2))) - (parseInt(a.start.slice(0, 2))) - (parseInt(a.start.slice(2)) / 60 * 1) + (parseInt(a.end.slice(2)) / 60 * 1));
    };
    e.addDetails = function(a, b, c, d, e) {
        if (size(this.container.root) > 600 && a >= 1)
            b.age !== undefined && lag(c, this.element, b, this.options),
            b.level !== undefined && llv(c, this.element, b, this.options),
            Md(e, c);
        else if (size(this.container.root) > 600 && a < 1)
            b.age !== undefined && Ms(this.element, "rdv-el-age", b.age),
            b.level !== undefined && Ms(this.element, "rdv-el-lvl", b.level),
            a <= 0.7 && (d.innerText += "..."),
            Md(e, Me("h4", "", {in: a > 0.7 ? "...":""}));
        else
            Mc(c, "cal-el-r-mob-info"),
            c.innerHTML = '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="512px" height="512px"><path d="M 64 6 C 32 6 6 32 6 64 C 6 96 32 122 64 122 C 96 122 122 96 122 64 C 122 32 96 6 64 6 z M 64 12 C 92.7 12 116 35.3 116 64 C 116 92.7 92.7 116 64 116 C 35.3 116 12 92.7 12 64 C 12 35.3 35.3 12 64 12 z M 64 30 A 9 9 0 0 0 64 48 A 9 9 0 0 0 64 30 z M 64 59 C 59 59 55 63 55 68 L 55 92 C 55 97 59 101 64 101 C 69 101 73 97 73 92 L 73 68 C 73 63 69 59 64 59 z"/></svg>',
            Md(this.element, c);
    };
    e.availability = function(a, b, c) {
        var td = this.container.today.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        if (!Boolean(a.isAvailable) || (!this.t.nextWeek && (td > b || ((td == b && parseInt(a.end.slice(0, 2)) < this.container.today.getHours()) || (td == b && parseInt(a.end.slice(0, 2)) == this.container.today.getHours() && parseInt(a.end.slice(2)) < this.container.today.getMinutes()))))) {
            c.style.opacity = "0.5";
            Mc(c, "r-unvailable"),
            Ms(c, "el-disp", 0);
        } else {
            Ms(c, "el-disp", 1);
        }
    };
    e.addPropreties = function(a, b, c, d, e, f) {
        Ms(this.element, ["el-date", "rdv-id", "txt-type", "day-el", "rdv-el-s", "rdv-el-e", "day-even", "gridIndex"], [this.t.week[this.y], a.id, a.txt, this.id, a.start, a.end, "", this.y]);
        let n = this.element,
            m = this.options.colorsTheme;
        n.style.setProperty("--major-border-color", dl(m, a.txt, 1)),
        n.style.setProperty("--major-backgrounColor", dl(m, a.txt, 0)),
        n.style.position = "absolute",
        n.style.height = (e * (b >= 0.5 ? b : 0.5)) + "px",
        n.style.top = (e * c + d)-1 + "px",
        n.style.width = "calc("+ (f.size) +"% - 0px)",
        n.style.left = f.offset+"%";
    };

    var lag = function(a, b, c, d) {
        Ms(b, "rdv-el-age", c.age),
        Md(a, Me('h3', "", {in: d.ages[c.age+1]}));
    },
    llv = function(a, b, c, d) {
        Ms(b, "rdv-el-lvl", c.level),
        Md(a, Me('h3', "", {in: d.levels[c.level+1]}));
    },
    inn = function(a) {
        let j = a.start.slice(0, 2)+":"+a.start.slice(2)+" - "+a.end.slice(0, 2)+":"+a.end.slice(2)
        return Me("h4", "cal-r-date", {in: j})
    },
    dl = function(a, b, c) {
        return a[b ? "prv" : "col"][c ? "major" : "minor"]
    },
    stringToTimeMin = (a) => {
        if (typeof a === 'number') return a
        var b = parseInt(a.slice(0, 2)) * 60,
            c = parseInt(a.slice(2));
        return b+c
    }

    var getElementsIndex = function(a) {
        var b = [],
            res = {};
    
        if (a.length <= 1) {
            return [{index: 0, size: 100, offset: 0, object: a[0]}]
        }
        a.forEach((e, i) => {
            let st = stringToTimeMin(e.start),
                ed = stringToTimeMin(e.end),
                size = 0,
                offset;
    
            if (i == 0) {
                if (i+1 <= a.length-1) {
                    let nxst = stringToTimeMin(a[i+1].start);
                    // console.log(nxst, st, ed);
    
                    if (nxst >= st && nxst <= ed) {
                        size = 90
                        offset = 0;
                    } else {
                        size = 100
                        offset = 0;
                    }
                }
            } else {
                for (var el = i-1; el >= 0; el--) {
                    let nxst = stringToTimeMin(a[el].start),
                        nxed = stringToTimeMin(a[el].end),
                        st =  stringToTimeMin(e.start),
                        ed =  stringToTimeMin(e.end);
                    if (nxed - nxst < 60) nxed = nxst + 60;
                    
                    if (el-1 >= 0 && nxst <= st && nxed >= ed && b[el].size < 100 && b[el].offset == 0) {
                        size = 80
                        offset = 20;
                        break;
                    } else if (nxst <= st && nxed >= ed) {
                        size = 90
                        offset = 0;
                        break;
                    } else if (nxed >= ed || nxst <= ed && nxed > st || nxed > st) {
                        size = 80
                        offset = 20;
                        if (b[el].offset > 0) {
                            size -= 10;
                            offset += 10;
                        }
                        break;
                    } else if (0 == size) {
                        size = 100
                        offset = 0;
                    }
                }
            }
    
            res = {index: i, size: size, offset: offset, object: e};
            b.push(res);
        });
        return b
    }

    var Days = function(a) {
        let weekDays = [],
            nextWeek = false;
        
        var td = a.getDay()-1;
        if (td < 0) {
            td = 6;
        }
        if (a.getDay() == 0 && a.getHours() < 17) {
            for(var i = 6; i >= 0; i--) {
                let b = a.getDate() - i
                if (b <= 0) {
                    let u = a.getMonth(a);
                    if (u == 0) u = 11
                    b = daysOfMonth(a)[u] + b;
                }
                weekDays.push(b);
            }
        } else {
            if (a.getDay() == 0 && a.getHours() > 16 && a.getMinutes() >= 0) {
                nextWeek = true
            }
            for(var i = 0; i < 7; i++) {
                var b = (a.getDate() - a.getDay()+1 + i)
    
                if (a.getMonth(a) <= 1 && b <= 0) {
                    b = (daysOfMonth(a)[11] - a.getDay() + i + 2)
                } else if (b > daysOfMonth(a)[a.getMonth(a)] && a.getMonth(a) < 11) {
                    b -= daysOfMonth(a)[a.getMonth(a)];
                } else if (b <= 0) {
                    b = daysOfMonth(a)[a.getMonth(a)-1] + b;
                } else if (b > daysOfMonth(a)[a.getMonth(a)] && a.getMonth(a) >= 11) {
                    b = i - td + a.getDate() - daysOfMonth(a)[a.getMonth(a)] + (nextWeek ? 7 : 0);
                }
                weekDays.push(b);
            }
        }
        return {nextWeek: nextWeek, week: weekDays}
    }
    
    return fn.Calendar = fn, "undefined" != typeof window && (window.Calendar = fn), fn
}));