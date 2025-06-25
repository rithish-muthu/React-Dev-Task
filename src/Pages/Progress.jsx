import {
  Calendar,
  Circle,
  Clock,
  User,
  Users,
  Image,
  Camera,
  Check,
  Activity,
  Mail,
  Bell,
  TriangleAlert,
  ChevronDown,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Calendars from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Css/CustomCalendar.css";

function Progress() {
  const [user, setUser] = useState("");
  const [capitalize, setCapitalize] = useState("User's");
  const [value, setValue] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [takenDates, setTakenDates] = useState([
    "2025-06-01",
    "2025-06-02",
    "2025-06-03",
  ]);
  const [active, setActive] = useState("overview");
  const missedDates = ["2025-06-04", "2025-06-05", "2025-06-06"];
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledBelow, setIsToggledBelow] = useState(false);
  const [time, setTime] = useState("20:00");
  const [email, setEmail] = useState("caretaker@gmail.com");
  const [alertTime, setAlertTIme] = useState("1 hour");
  const [list, setList] = useState(false);
  const alertTimes = [
    "1 hour",
    "2 hour",
    "3 hour",
    "4 hour",
    "5 hour",
    "6 hour",
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [imageUrl, setImageUrl] = useState(null);

  const isToday = formatDate(value) === formatDate(new Date());
  const isFuture = formatDate(value) > formatDate(new Date());
  const isPast = formatDate(value) < formatDate(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const gettedUser = localStorage.getItem("user");
      setUser(gettedUser);
      if (gettedUser && gettedUser !== user) {
        const capital =
          gettedUser.charAt(0).toLocaleUpperCase() + gettedUser.slice(1);
        setCapitalize(capital);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // creates temporary URL
      setImageUrl(url);
    }
  };

  const Completed = () => {
    return (
      <div className="bg-green-500 w-fit h-fit p-3 rounded-full text-white">
        <Check />
      </div>
    );
  };

  const NotCompleted = () => {
    return (
      <div className="bg-red-500 w-fit h-fit p-3 rounded-full text-white">
        <TriangleAlert />
      </div>
    );
  };

  return (
    <div className="bg-[#effaf8]">
      <header className="flex items-center justify-between p-5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-500 rounded-lg text-white ">
            <h1 className="font-extrabold text-lg">M</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">MediCare Companion</h1>
            <h5 className="text-[#64748b]">{`${capitalize} view`}</h5>
          </div>
        </div>
        <div
          className="flex items-center gap-2 border-1 border-[#64748b] p-2 rounded-md hover:bg-[#f1f5f9] cursor-pointer"
          onClick={() => {
            localStorage.setItem(
              "user",
              user === "patient" ? "caretaker" : "patient"
            );
          }}
        >
          {user === "patient" ? <Users /> : <User />}

          <h6 className="font-bold">
            Switch To {user === "patient" ? "Caretaker" : "Patient"}
          </h6>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        {user === "patient" ? (
          <div>
            <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-7 text-white flex flex-col">
              <div className="flex items-center gap-5">
                <div className=" bg-[#619df2] w-15 h-15 rounded-xl flex items-center justify-center ">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="font-bold text-3xl">Good Afternoon!</h1>
                  <h5 className="text-lg">
                    Ready to stay on track with your medication?
                  </h5>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="font-bold text-2xl">0</h3>
                  <h5 className="text-white/80">Day Streak</h5>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <Circle />
                  <h2 className="text-white/80">Today's Status</h2>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h1 className="text-2xl font-bold">0%</h1>
                  <h4 className="text-white/80">Monthly Rate</h4>
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
              <div className="rounded-lg border shadow-sm h-fit p-6 bg-white mt-6">
                <div className="font-semibold tracking-tight flex items-center gap-2 text-2xl">
                  <Calendar className="text-blue-700" />
                  <h1>Today's Medication</h1>
                </div>

                {!isSubmitted ? (
                  <div>
                    <div className="rounded-lg border shadow-sm hover:shadow-md transition-shadow mt-6">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">1</span>
                          </div>
                          <div>
                            <h2 className="font-medium">
                              Daily Medication Set
                            </h2>
                            <h5 className="text-sm text-black/80">
                              Complete set of daily tablets
                            </h5>
                          </div>
                        </div>
                        <div className="inline-flex gap-2 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          <Clock />
                          8:00 AM
                        </div>
                      </div>
                    </div>

                    {/* Photo Proof Section */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm border-dashed border-2 border-gray-300 flex flex-col items-center py-6 mt-6 gap-3">
                      <Image className="h-13 w-13 text-gray-500" />
                      <h3 className="font-medium">
                        Add Proof Photo (Optional)
                      </h3>
                      <h5 className="text-sm text-gray-500 text-center max-w-xs">
                        Take a photo of your medication or pill organizer as
                        confirmation
                      </h5>
                      <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-md shadow-sm cursor-pointer text-black hover:bg-gray-100 border-gray-200">
                        <Camera className="w-5 h-5" />
                        <span className="font-semibold">
                          {imageUrl ? "Change Photo" : "Take Photo"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                      {imageUrl && (
                        <img src={imageUrl} alt="" className="h-56" />
                      )}
                    </div>

                    {/* Mark As Taken Button */}
                    <button
                      className={`w-full p-2 mt-6 rounded-md flex items-center justify-center gap-2
        ${
          isToday
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-200 text-gray-700 cursor-not-allowed"
        }`}
                      onClick={() => {
                        if (isToday) {
                          const dateStr = formatDate(value);
                          if (!takenDates.includes(dateStr)) {
                            setTakenDates([...takenDates, dateStr]);
                            setIsSubmitted(true);
                          }
                        }
                        console.log(isToday);
                      }}
                      disabled={!isToday}
                    >
                      <span className="font-medium text-lg">
                        {isPast
                          ? "❌ Cannot mark past dates"
                          : isFuture
                          ? "❌ Cannot mark future dates"
                          : "✔️Mark As Taken"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col items-center p-6 gap-2 border-2 border-green-500 border-solid mt-6 rounded-xl bg-[#f0fdf4]">
                      <Completed />
                      <h2 className="text-xl font-bold">
                        Medication Completed!
                      </h2>
                      <h5 className="text-green-500">{`Great job! You've taken your medication for ${value.getFullYear()}:${
                        value.getMonth() + 1
                      }:${value.getDate()}`}</h5>
                    </div>
                    <div className="rounded-lg border border-green-500 shadow-sm hover:shadow-md transition-shadow mt-6 bg-[#f0fdf4]">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Completed />
                          <div>
                            <h2 className="font-medium">
                              Daily Medication Set
                            </h2>
                            <h5 className="text-sm text-green-500">
                              Complete set of daily tablets
                            </h5>
                          </div>
                        </div>
                        <div className="inline-flex gap-2 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-200">
                          <Clock />
                          8:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel: Calendar */}
              <div className="bg-white rounded-xl shadow-md w-full p-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Medication Calendar
                </h2>
                <Calendars
                  onChange={setValue}
                  value={value}
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const dateStr = formatDate(date);
                      if (formatDate(new Date()) === dateStr)
                        return "today-dot";
                      if (takenDates.includes(dateStr)) return "taken-dot";
                      if (missedDates.includes(dateStr)) return "missed-dot";
                    }
                  }}
                />
                <div className="flex flex-col justify-around mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                    Medication taken
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-red-400 rounded-full inline-block"></span>
                    Missed medication
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
                    Today
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-7 text-white flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Caretaker Dashboard</h2>
                  <h5 className="text-white/90 text-lg">
                    Monitoring Eleanor Thompson's medication adherence
                  </h5>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold">85%</h2>
                  <h4 className="text-white/80">Adherence Rate</h4>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold">5</h2>
                  <h4 className="text-white/80">Current Streak</h4>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold">3</h2>
                  <h4 className="text-white/80">Missed This Month</h4>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold">4</h2>
                  <h4 className="text-white/80">Taken This Week</h4>
                </div>
              </div>
            </div>
            <div>
              <div className=" items-center justify-center rounded-md bg-[#f1f5f9] p-1 grid w-full grid-cols-4 mt-6 ">
                <button
                  className={
                    active === "overview"
                      ? "bg-white p-1 rounded-md font-medium cursor-pointer"
                      : " p-1 font-medium cursor-pointer"
                  }
                  onClick={() => setActive("overview")}
                >
                  Overview
                </button>
                <button
                  className={
                    active === "recent activity"
                      ? "bg-white p-1 rounded-md font-medium cursor-pointer"
                      : " p-1 font-medium cursor-pointer"
                  }
                  onClick={() => setActive("recent activity")}
                >
                  Recent Activity
                </button>
                <button
                  className={
                    active === "calendar view"
                      ? "bg-white p-1 rounded-md font-medium cursor-pointer"
                      : " p-1 font-medium cursor-pointer"
                  }
                  onClick={() => setActive("calendar view")}
                >
                  calendar View
                </button>
                <button
                  className={
                    active === "notification"
                      ? "bg-white p-1 rounded-md font-medium cursor-pointer"
                      : " p-1 font-medium cursor-pointer"
                  }
                  onClick={() => setActive("notification")}
                >
                  Notifications
                </button>
              </div>
              <div>
                {active === "overview" ? (
                  <div className="mt-2 space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="rounded-lg border bg-white shadow-sm p-6 border-gray-300">
                        <div className="flex items-center gap-3">
                          <Calendar className="text-blue-600" />
                          <h2 className="font-medium text-xl">
                            Today's Status
                          </h2>
                        </div>
                        <div className="bg-[#f8fafc] p-2 flex items-center justify-between ">
                          <div>
                            <h2 className="font-medium">
                              Daily Medication Set
                            </h2>
                            <h6 className="text-gray-400 text-sm">8:00AM</h6>
                          </div>
                          <div className="bg-red-500 text-white p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                            Pending
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border bg-white p-6 shadow border-gray-300 flex flex-col gap-3">
                        <h2 className="font-medium text-2xl">Quick Actions</h2>
                        <div
                          className="p-2 border border-gray-300 rounded-md flex items-center gap-4 cursor-pointer"
                          onClick={() => alert("Remainder Email Sent To the Patient")}
                        >
                          <Mail />
                          <h4 className="font-medium">Send Remainder Email</h4>
                        </div>
                        <div className="p-2 border border-gray-300 rounded-md flex items-center gap-4 cursor-pointer">
                          <Bell />
                          <h4 className="font-medium">
                            Configure Notifications
                          </h4>
                        </div>
                        <div className="p-2 border border-gray-300 rounded-md flex items-center gap-4 cursor-pointer">
                          <Calendar />
                          <h4 className="font-medium">View Full Calendar</h4>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-white border-gray-300 shadow-sm p-6 flex flex-col gap-6">
                      <h3 className="font-medium text-2xl">
                        Monthly Adherence Progress
                      </h3>
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                          <h2>Overall Progress</h2> <h2>85 %</h2>
                        </div>
                        <div className="w-full bg-[#f1f5f9] h-4 rounded-full">
                          <div
                            className="bg-black h-full rounded-l-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-evenly gap-10">
                          <div className="flex flex-col items-center">
                            <h2 className="text-green-500 font-medium">
                              22 Days
                            </h2>
                            <h6 className="text-black/60">Taken</h6>
                          </div>
                          <div className="flex flex-col items-center">
                            <h2 className="text-red-500 font-medium">3 Days</h2>
                            <h6 className="text-black/60">Missed</h6>
                          </div>
                          <div className="flex flex-col items-center">
                            <h2 className="text-blue-500 font-medium">
                              5 Days
                            </h2>
                            <h6 className="text-black/60">Remaining</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : active === "recent activity" ? (
                  <div className="rounded-lg border bg-white border-gray-300 shadow-sm p-6">
                    <div>
                      <h1 className="text-2xl font-semibold ">
                        Recent Medication Activity
                      </h1>
                    </div>
                    <div className="mt-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg border-gray-300">
                        <div className="flex items-center gap-5">
                          <Completed />
                          <div>
                            <h3 className="font-medium">Monday, June 10</h3>
                            <h6 className="text-sm text-black/60">
                              Taken at 8:30 AM
                            </h6>
                          </div>
                        </div>
                        <div className="bg-gray-200 text-black p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                          Completed
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg border-gray-300">
                        <div className="flex items-center gap-5">
                          <Completed />
                          <div>
                            <h3 className="font-medium">Sunday, June 9</h3>
                            <h6 className="text-sm text-black/60">
                              Taken at 8:15 AM
                            </h6>
                          </div>
                        </div>
                        <div className="bg-gray-200 text-black p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                          Completed
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg border-gray-300">
                        <div className="flex items-center gap-5">
                          <NotCompleted />
                          <div>
                            <h3 className="font-medium">Saturday, June 8</h3>
                            <h6 className="text-sm text-black/60">
                              Medication missed
                            </h6>
                          </div>
                        </div>
                        <div className="bg-red-500 text-white p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                          Missed
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg border-gray-300">
                        <div className="flex items-center gap-5">
                          <Completed />
                          <div>
                            <h3 className="font-medium">Friday, June 7</h3>
                            <h6 className="text-sm text-black/60">
                              Taken at 8:45 AM
                            </h6>
                          </div>
                        </div>
                        <div className="bg-gray-200 text-black p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                          Completed
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg border-gray-300">
                        <div className="flex items-center gap-5">
                          <Completed />
                          <div>
                            <h3 className="font-medium">Thursday, June 6</h3>
                            <h6 className="text-sm text-black/60">
                              Taken at 8:20 AM
                            </h6>
                          </div>
                        </div>
                        <div className="bg-gray-200 text-black p-0.5 text-sm font-medium rounded-full px-2 flex items-center">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                ) : active === "calendar view" ? (
                  <div className="rounded-lg border bg-white border-gray-300 shadow-sm p-6">
                    <div className="bg-white rounded-xl shadow-md w-full p-6 mt-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Medication Calendar
                      </h2>
                      <Calendars
                        onChange={setValue}
                        value={value}
                        tileClassName={({ date, view }) => {
                          if (view === "month") {
                            const dateStr = formatDate(date);
                            if (formatDate(new Date()) === dateStr)
                              return "today-dot";
                            if (takenDates.includes(dateStr))
                              return "taken-dot";
                            if (missedDates.includes(dateStr))
                              return "missed-dot";
                          }
                        }}
                      />
                      <div className="flex flex-col justify-around mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                          Medication taken
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-red-400 rounded-full inline-block"></span>
                          Missed medication
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span>
                          Today
                        </div>
                      </div>
                    </div>
                  </div>
                ) : active === "notification" ? (
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="rounded-lg border bg-white border-gray-300 shadow-sm p-6">
                      <div className="flex items-center gap-3">
                        <Bell className="text-blue-500" />
                        <h3 className="font-medium text-2xl">
                          Notification Preferences
                        </h3>
                      </div>
                      <div className="mt-6">
                        <div className="border-b border-gray-300 pb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                Email Notifications
                              </h4>
                              <h6 className="text-sm text-black/60">
                                Receive medication alerts via email
                              </h6>
                            </div>
                            <div>
                              <label className="relative inline-flex items-center cursor-pointer justify-center">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={isToggled}
                                  onChange={() => setIsToggled(!isToggled)}
                                />
                                <div className="w-14 h-8 bg-[#0b1224] rounded-full relative peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                              </label>
                            </div>
                          </div>
                          {isToggled && (
                            <div className="p-4">
                              <h1 className="font-medium">Email Address</h1>
                              <input
                                type="email"
                                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                        <div className="mt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                Missed Medication Alerts
                              </h4>
                              <h6 className="text-sm text-black/60">
                                Get notified when medication is not taken on
                                time
                              </h6>
                            </div>
                            <div>
                              <label className="relative inline-flex items-center cursor-pointer justify-center">
                                <input
                                  type="checkbox"
                                  className="sr-only peer"
                                  checked={isToggledBelow}
                                  onChange={() =>
                                    setIsToggledBelow(!isToggledBelow)
                                  }
                                />
                                <div className="w-14 h-8 bg-[#0b1224] rounded-full relative peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                              </label>
                            </div>
                          </div>
                          {isToggledBelow && (
                            <div className="p-4 flex flex-col gap-5">
                              <div className="flex flex-col gap-2">
                                <h3 className="font-medium">
                                  Alert me if medication isn't taken within
                                </h3>
                                <div>
                                  <div
                                    className="w-full border border-black shadow-md p-2 rounded-sm flex items-center justify-between"
                                    onClick={() => setList(true)}
                                  >
                                    <h4>{alertTime}</h4>
                                    <ChevronDown />
                                  </div>
                                  {list && (
                                    <div className="w-full bg-white/80 shadow border border-gray-300 rounded-sm p-2 flex flex-col gap-2">
                                      {alertTimes.map((t, i) => (
                                        <div
                                          className="border rounded-md p-1 px-5"
                                          key={i}
                                          onClick={() => {
                                            setAlertTIme(t);
                                            setList(false);
                                          }}
                                        >
                                          {t}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium ">
                                  Daily Remainder
                                </h3>
                                <input
                                  type="time"
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-1"
                                  value={time}
                                  onChange={(e) => setTime(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-white border-gray-300 shadow-sm p-6">
                      <div className="flex gap-3 items-center">
                        <Mail className="text-green-500" />
                        <h3 className="font-medium text-2xl">Email Preview</h3>
                      </div>
                      <div className="bg-[#f9fafb] p-4 border border-gray-300 rounded-lg flex flex-col gap-1">
                        <h3 className="font-medium">
                          Subject: Medication Alert - Eleanor Thompson
                        </h3>
                        <h6 className="text-black/60">Hello,</h6>
                        <h6 className="text-black/60">
                          This is a reminder that Eleanor Thompson has not taken
                          her medication today.
                        </h6>
                        <h6 className="text-black/60">
                          Please check with her to ensure she takes her
                          prescribed medication.
                        </h6>
                        <h6 className="text-black/60">Current adherence rate: 85% (5-day streak)</h6>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Progress;
