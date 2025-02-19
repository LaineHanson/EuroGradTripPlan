import React, { useState } from "react";
import { Calendar, Clock, MapPin, Edit2, Save, X } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card.jsx";

const itineraryData = {
  "May 11": {
    location: "Dallas",
    events: [
      { time: "3:30 pm", description: "Arrive to DFW" },
      { time: "5:40 pm", description: "DFW Flight" },
    ],
  },
  "May 12": {
    location: "London",
    events: [
      { time: "9:00 am", description: "LHR land" },
      { time: "10:00 am", description: "Uber to hotel and drop off baggage" },
      { time: "12:00 pm", description: "Drury 188-189 Covent Garden Café & Brunch" },
      { time: "2:45 pm", description: "Hyde Park & Buckingham Palace drive-by" },
    ],
  },
  "May 13": {
    location: "London",
    events: [
      { time: "10:00 am", description: "Borough Market" },
      { time: "12:00 pm", description: "Lunch at Borough Market" },
    ],
  },
};

const App = () => {
  const [itinerary, setItinerary] = useState(itineraryData);
  const [editingDay, setEditingDay] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const handleEditEvent = (day, index) => {
    setEditingDay(day);
    setEditingEvent(index);
  };

  const handleSaveEvent = (day, index, newTime, newDescription) => {
    const updatedItinerary = { ...itinerary };
    updatedItinerary[day].events[index] = { time: newTime, description: newDescription };
    setItinerary(updatedItinerary);
    setEditingDay(null);
    setEditingEvent(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-lavender-600 mb-6">Europe Trip May 2025</h1>
      
      {/* Tabs Navigation */}
      <Tabs.Root defaultValue={Object.keys(itinerary)[0]} className="w-full">
        <Tabs.List className="flex border-b border-gray-300 pb-2 mb-4 space-x-4 overflow-x-auto">
          {Object.keys(itinerary).map((day) => (
            <Tabs.Trigger
              key={day}
              value={day}
              className="px-4 py-2 rounded-t-lg bg-lavender-100 text-lavender-700 font-semibold focus:outline-none"
            >
              {day}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {Object.entries(itinerary).map(([day, dayData]) => (
          <Tabs.Content key={day} value={day} className="mt-4">
            <Card className="bg-gray-100 p-4 rounded-lg shadow">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  <Calendar className="inline w-5 h-5 mr-2" /> {day}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5" /> {dayData.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {dayData.events.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-300">
                    {editingDay === day && editingEvent === index ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          defaultValue={event.time}
                          className="w-24 p-1 border rounded"
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEvent(day, index, e.target.value, e.target.nextSibling.value)}
                        />
                        <input
                          type="text"
                          defaultValue={event.description}
                          className="flex-1 p-1 border rounded"
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEvent(day, index, e.target.previousSibling.value, e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSaveEvent(day, index, document.querySelector('input[type="text"]').value, document.querySelectorAll('input[type="text"]')[1].value)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingDay(null);
                              setEditingEvent(null);
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{event.time}</span>
                        </div>
                        <p className="flex-1">{event.description}</p>
                        <button
                          onClick={() => handleEditEvent(day, index)}
                          className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};

export default App;
