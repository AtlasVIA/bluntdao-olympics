import React from "react";
import { Badge, Card, DataTable, StatCard } from "../../../components/bluntdao-olympics/common";
import type { Column } from "../../../components/bluntdao-olympics/common/DataTable";
import { useMedals } from "../../../components/bluntdao-olympics/hooks";

type CountryMedals = {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

const MedalTallyView: React.FC = () => {
  const { medals } = useMedals();

  const columns: Array<Column<CountryMedals>> = [
    { header: "Country", accessor: "country" },
    { header: "Gold", accessor: "gold" },
    { header: "Silver", accessor: "silver" },
    { header: "Bronze", accessor: "bronze" },
    { header: "Total", accessor: "total" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-base-content">Medal Tally</h1>
          <Badge label="Updated Live" variant="primary" size="lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Gold Medals" value={medals?.totalGold || 0} icon={<span className="text-xl">🥇</span>} />
          <StatCard title="Silver Medals" value={medals?.totalSilver || 0} icon={<span className="text-xl">🥈</span>} />
          <StatCard title="Bronze Medals" value={medals?.totalBronze || 0} icon={<span className="text-xl">🥉</span>} />
        </div>

        <Card>
          <DataTable columns={columns} data={medals?.countries || []} />
        </Card>
      </div>
    </div>
  );
};

export default MedalTallyView;
