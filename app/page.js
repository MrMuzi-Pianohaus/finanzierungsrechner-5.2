'use client';
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Finanzierungsrechner() {
  const [preis, setPreis] = useState(27160);
  const [laufzeit, setLaufzeit] = useState(36);
  const [zins, setZins] = useState(4.9);
  const [anzahlung, setAnzahlung] = useState(9053);
  const [ergebnis, setErgebnis] = useState(null);

  const berechne = () => {
    const r = zins / 100 / 12;
    const finanzierungsbetrag = preis - anzahlung;
    const monatlicheRate = finanzierungsbetrag * r / (1 - Math.pow(1 + r, -laufzeit));
    const gesamtsumme = anzahlung + monatlicheRate * laufzeit;

    setErgebnis({
      finanzierungsbetrag: finanzierungsbetrag.toFixed(2),
      monatlicheRate: monatlicheRate.toFixed(2),
      gesamtsumme: gesamtsumme.toFixed(2)
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-[#8b0000]">Finanzierungsrechner (Zinsen integriert)</h1>

      <label>Klavierpreis (€):</label>
      <Input type="number" value={preis} onChange={(e) => setPreis(parseFloat(e.target.value))} />

      <label>Anzahlung (€):</label>
      <Input type="number" value={anzahlung} onChange={(e) => setAnzahlung(parseFloat(e.target.value))} />

      <label>Laufzeit (Monate):</label>
      <Input type="number" value={laufzeit} onChange={(e) => setLaufzeit(parseInt(e.target.value))} />

      <label>Zinssatz (% p.a.):</label>
      <Input type="number" value={zins} onChange={(e) => setZins(parseFloat(e.target.value))} />

      <Button onClick={berechne}>Jetzt berechnen</Button>

      {ergebnis && (
        <Card>
          <CardContent className="p-4 space-y-2 text-[#2e2e2e]">
            <p><strong>Finanzierungsbetrag:</strong> € {ergebnis.finanzierungsbetrag}</p>
            <p><strong>Monatliche Rate:</strong> € {ergebnis.monatlicheRate}</p>
            <p><strong>Gesamtsumme für den Kunden:</strong> € {ergebnis.gesamtsumme}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
