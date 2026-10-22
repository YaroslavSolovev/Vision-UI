import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  UserRound,
  LogOut,
  Rocket,
  Menu,
  X,
  Bell,
  Settings,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  WalletCards,
  Package,
  MoreHorizontal,
  Check,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import "./styles.css";

// Данные для демонстрационных графиков на главной странице.
const data = [
  { m: "Jan", v: 18 },
  { m: "Feb", v: 28 },
  { m: "Mar", v: 23 },
  { m: "Apr", v: 38 },
  { m: "May", v: 32 },
  { m: "Jun", v: 50 },
  { m: "Jul", v: 46 },
  { m: "Aug", v: 64 },
  { m: "Sep", v: 59 },
  { m: "Oct", v: 74 },
  { m: "Nov", v: 69 },
  { m: "Dec", v: 88 },
];
const nav: [string, string, React.ElementType][] = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/tables", "Tables", BarChart3],
  ["/billing", "Billing", CreditCard],
  ["/profile", "Profile", UserRound],
];

// Все страницы подключены через React Router, поэтому переходы работают без перезагрузки.
function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Shell />} />
    </Routes>
  );
}
function Shell() {
  const [open, setOpen] = React.useState(false);
  const l = useLocation();
  const title = l.pathname.includes("tables")
    ? "Tables"
    : l.pathname.includes("billing")
      ? "Billing"
      : l.pathname.includes("profile")
        ? "Profile"
        : "Dashboard";
  return (
    <div className="app">
      <aside className={open ? "side open" : "side"}>
        <div className="brand">
          <b>V</b>
          <strong>
            VISION UI<small>FREE DASHBOARD</small>
          </strong>
          <button onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <label>MAIN MENU</label>
        {nav.map(([to, n, I]) => (
          <NavLink
            to={to}
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
            onClick={() => setOpen(false)}
          >
            <I size={18} />
            {n}
          </NavLink>
        ))}
        <label>ACCOUNT PAGES</label>
        <NavLink to="/auth/sign-in" className="nav">
          <LogOut size={18} />
          Sign In
        </NavLink>
        <NavLink to="/auth/sign-up" className="nav">
          <Rocket size={18} />
          Sign Up
        </NavLink>
        <div className="upgrade">
          <Rocket size={18} />
          <b>Upgrade to PRO</b>
          <p>Unlock all premium features and templates.</p>
          <button>
            Upgrade now <ArrowUpRight size={14} />
          </button>
        </div>
      </aside>
      <main>
        <header>
          <button className="menub" onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <div className="crumb">
            Pages <b>/</b> {title}
          </div>
          <div className="actions">
            <div className="search">
              <Search size={16} />
              <input placeholder="Search" />
            </div>
            <Bell />
            <Settings />
            <div className="avatar">AM</div>
            <span>Alex Morgan</span>
          </div>
        </header>
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
        <footer>
          © 2024 Vision UI. Made with <i>♥</i> by Creative Tim
        </footer>
      </main>
    </div>
  );
}
function Head({
  eyebrow = "OVERVIEW",
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="head">
      <div>
        <small>{eyebrow}</small>
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
      </div>
      <div>
        <button className="ghost">Export</button>
        <button className="primary">+ Add new</button>
      </div>
    </div>
  );
}
function Stat({
  name,
  val,
  change,
  icon,
  down = false,
}: {
  name: string;
  val: string;
  change: string;
  icon: React.ReactNode;
  down?: boolean;
}) {
  return (
    <div className="stat">
      <div>
        <p>{name}</p>
        <h2>{val}</h2>
      </div>
      <span className="sicon">{icon}</span>
      <div className={down ? "down change" : "change"}>
        {down ? <ArrowDownRight /> : <ArrowUpRight />}
        <b>{change}</b> <span>since last month</span>
      </div>
    </div>
  );
}
function Dashboard() {
  return (
    <>
      <Head
        title="Dashboard"
        desc="See what's happening with your business today."
      />
      <div className="stats">
        <Stat
          name="Today's Money"
          val="$53,000"
          change="+55%"
          icon={<WalletCards />}
        />
        <Stat name="Today's Users" val="2,300" change="+3%" icon={<Users />} />
        <Stat
          name="New Clients"
          val="+3,462"
          change="-2%"
          down
          icon={<Package />}
        />
        <Stat
          name="Total Sales"
          val="$103,430"
          change="+5%"
          icon={<BarChart3 />}
        />
      </div>
      <div className="grid">
        <section className="card wide">
          <div className="cardhead">
            <div>
              <h3>Sales overview</h3>
              <p>
                <i className="green">●</i> +5% more in 2024
              </p>
            </div>
            <MoreHorizontal />
          </div>
          <select>
            <option>Last 12 months</option>
          </select>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#18d4f2" stopOpacity=".5" />
                  <stop offset="1" stopColor="#18d4f2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff12" vertical={false} />
              <XAxis
                dataKey="m"
                tick={{ fill: "#8390b0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#8390b0", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#111b3b",
                  border: "1px solid #2a3b70",
                }}
              />
              <Area
                dataKey="v"
                stroke="#1bd5f3"
                fill="url(#g)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="card">
          <div className="cardhead">
            <div>
              <h3>Active users</h3>
              <p>Live activity</p>
            </div>
            <span className="live">● Live</span>
          </div>
          <h2 className="big">
            2,489 <small>users</small>
          </h2>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={data.slice(0, 7)}>
              <XAxis
                dataKey="m"
                tick={{ fill: "#8390b0", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#111b3b" }} />
              <Bar dataKey="v" fill="#17cfee" radius={[6, 6, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
      <div className="grid bottom">
        <section className="card">
          <div className="cardhead">
            <div>
              <h3>Projects</h3>
              <p>
                <Check size={14} className="green" /> 30 done this month
              </p>
            </div>
            <a>View all</a>
          </div>
          {["Vision UI Dashboard", "Marketplace app", "Mobile banking"].map(
            (x, i) => (
              <div className="row">
                <div className="picon">
                  <Package size={16} />
                </div>
                <div>
                  <b>{x}</b>
                  <small>
                    {["Design system", "Development", "Product design"][i]}
                  </small>
                </div>
                <strong>{[64, 38, 82][i]}%</strong>
                <div className="progress">
                  <i style={{ width: [64, 38, 82][i] + "%" }} />
                </div>
                <MoreHorizontal />
              </div>
            ),
          )}
        </section>
        <section className="card quote">
          <h3>“</h3>
          <p>Great design is a balance between clarity and delight.</p>
          <small>— Vision UI principles</small>
          <button className="primary">
            Explore design system <ArrowUpRight size={15} />
          </button>
        </section>
      </div>
    </>
  );
}
function Tables() {
  return (
    <>
      <Head
        eyebrow="MANAGEMENT"
        title="Tables"
        desc="A complete overview of your team and recent activity."
      />
      <section className="card tablecard">
        <div className="cardhead">
          <div>
            <h3>Team members</h3>
            <p>Manage your active workspace members</p>
          </div>
          <button className="primary">+ Add member</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>JOINED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              "Mark Johnson",
              "Esthera Jackson",
              "Laurent Perrier",
              "Cody Fisher",
              "Robert Fox",
            ].map((x, i) => (
              <tr>
                <td>
                  <div className="person">
                    <span className="avatar">
                      {x
                        .split(" ")
                        .map((y) => y[0])
                        .join("")}
                    </span>
                    <div>
                      <b>{x}</b>
                      <small>
                        {x.toLowerCase().replace(" ", " .")}@example.com
                      </small>
                    </div>
                  </div>
                </td>
                <td>{i ? "Member" : "Owner"}</td>
                <td>
                  <span className="status">● Active</span>
                </td>
                <td>0{i + 2} Jan 2024</td>
                <td>
                  <MoreHorizontal />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
function Billing() {
  return (
    <>
      <Head
        eyebrow="ACCOUNT"
        title="Billing"
        desc="Manage your plan, payment method and invoices."
      />
      <div className="billing">
        <section className="card plan">
          <small>CURRENT PLAN</small>
          <h2>Premium</h2>
          <p>Best for growing teams</p>
          <div className="price">
            $79 <small>/ month</small>
          </div>
          <div className="progress">
            <i style={{ width: "72%" }} />
          </div>
          <p>7,200 of 10,000 monthly actions</p>
          <button className="primary">Manage subscription</button>
        </section>
        <section className="card">
          <div className="cardhead">
            <div>
              <h3>Payment method</h3>
              <p>Your default payment details</p>
            </div>
            <a>Edit</a>
          </div>
          <div className="cc">
            <b>VISA</b>
            <strong>•••• •••• •••• 4242</strong>
            <small>
              Alex Morgan <span>09/28</span>
            </small>
          </div>
          <p>🔒 Payments are secure and encrypted</p>
        </section>
      </div>
      <section className="card tablecard">
        <div className="cardhead">
          <div>
            <h3>Invoices</h3>
            <p>Recent billing history</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>INVOICE</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {["INV-2024-001", "INV-2023-012", "INV-2023-011"].map((x, i) => (
              <tr>
                <td>
                  <b>{x}</b>
                </td>
                <td>01 {["Feb", "Jan", "Dec"][i]} 2024</td>
                <td>$79.00</td>
                <td>
                  <span className="status">● Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
function Profile() {
  return (
    <>
      <Head
        eyebrow="ACCOUNT"
        title="Profile"
        desc="Manage your personal information and preferences."
      />
      <div className="profile">
        <section className="card profilecard">
          <div className="cover" />
          <span className="profileavatar">AM</span>
          <h2>Alex Morgan</h2>
          <p>Product designer · San Francisco, CA</p>
          <div className="profile-stats">
            <b>
              12<small>Projects</small>
            </b>
            <b>
              4.8k<small>Followers</small>
            </b>
            <b>
              86%<small>Profile</small>
            </b>
          </div>
        </section>
        <section className="card form">
          <div className="cardhead">
            <div>
              <h3>Personal information</h3>
              <p>Update your profile details</p>
            </div>
            <a>Save changes</a>
          </div>
          <label>
            First name
            <input value="Alex" readOnly />
          </label>
          <label>
            Last name
            <input value="Morgan" readOnly />
          </label>
          <label>
            Email address
            <input value="alex.morgan@example.com" readOnly />
          </label>
          <label>
            Phone number
            <input value="+1 415 555 0142" readOnly />
          </label>
          <label className="span">
            Bio
            <textarea
              value="Building thoughtful digital experiences for modern teams."
              readOnly
            />
          </label>
        </section>
      </div>
    </>
  );
}
function Auth() {
  const signup = useLocation().pathname.includes("sign-up");
  return (
    <div className="auth">
      <div className="authhero">
        <div className="brand">
          <b>V</b>
          <strong>
            VISION UI<small>FREE DASHBOARD</small>
          </strong>
        </div>
        <div>
          <small>{signup ? "GET STARTED" : "WELCOME BACK"}</small>
          <h1>
            {signup ? "Build your vision." : "Welcome back."}
            <br />
            <span>Ship it faster.</span>
          </h1>
          <p>
            A premium dashboard experience for teams who care about clarity,
            speed and beautiful work.
          </p>
        </div>
      </div>
      <div className="authform">
        <small>{signup ? "CREATE ACCOUNT" : "SIGN IN"}</small>
        <h2>{signup ? "Create your account" : "Sign in to your account"}</h2>
        <p>
          {signup
            ? "Join thousands of teams building better products."
            : "Enter your details to continue."}
        </p>
        {signup && (
          <label>
            Full name
            <input placeholder="Alex Morgan" />
          </label>
        )}
        <label>
          Email address
          <input placeholder="name@company.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary authbtn">
          {signup ? "Create account" : "Sign in"} <ArrowUpRight size={15} />
        </button>
        <p className="switch">
          {signup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <NavLink to={signup ? "/auth/sign-in" : "/auth/sign-up"}>
            {signup ? "Sign in" : "Sign up"}
          </NavLink>
        </p>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
