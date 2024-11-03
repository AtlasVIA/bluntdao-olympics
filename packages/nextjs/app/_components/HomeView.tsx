import React from "react";
import { Badge, Card, Column, StatCard } from "../../components/bluntdao-olympics/common";
import { Home } from "../../components/bluntdao-olympics/screens";

const HomeView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Column>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-base-content">BluntDAO Olympics</h1>
          <Badge label="Live" variant="success" size="lg" />
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Participants"
              value="156"
              change="12"
              isPositive={true}
              icon={<span className="text-xl">👥</span>}
            />
            <StatCard
              title="Active Events"
              value="8"
              change="2"
              isPositive={true}
              icon={<span className="text-xl">🎯</span>}
            />
            <StatCard
              title="Total Medals"
              value="24"
              change="6"
              isPositive={true}
              icon={<span className="text-xl">🏅</span>}
            />
          </div>
        </Card>

        <Home />
      </Column>
    </div>
  );
};

export default HomeView;
