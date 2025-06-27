"use client";

import {
  useGetAttributes,
  useSetAttributes,
  useGetDefenses,
  useSetDefenses,
} from "@/hooks";
import { VariablesModifiers } from "@/constants/attributes-and-defenses";
import { getVariableOptions } from "@/constants/variable-labels";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Helper function to generate custom modifier ID
const generateCustomModifierId = (
  variableName: string,
  customName: string
): string => {
  // Remove special characters and convert to camelCase
  const cleanCustomName = customName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters except spaces
    .replace(/\s+(\w)/g, (_, char) => char.toUpperCase()) // Convert to camelCase
    .replace(/^\w/, (char) => char.toLowerCase()); // First character lowercase

  return `${variableName}${
    cleanCustomName.charAt(0).toUpperCase() + cleanCustomName.slice(1)
  }`;
};

export default function Manager() {
  // React Query hooks
  const {
    data: attributes,
    isLoading: loadingAttributes,
    error: attributesError,
    refetch: refetchAttributes,
  } = useGetAttributes();

  const {
    data: defenses,
    isLoading: loadingDefenses,
    error: defensesError,
    refetch: refetchDefenses,
  } = useGetDefenses();

  const setAttributesMutation = useSetAttributes();
  const setDefensesMutation = useSetDefenses();

  // Local state for editing
  const [editingAttributes, setEditingAttributes] =
    useState<VariablesModifiers | null>(null);
  const [editingDefenses, setEditingDefenses] =
    useState<VariablesModifiers | null>(null);

  // Get variable options for select
  const variableOptions = getVariableOptions();

  // Helper function to get available options for a variable
  const getAvailableOptions = (
    variableKey: string,
    isAttributes: boolean,
    currentModifierIndex?: number
  ) => {
    const currentModifiers = isAttributes
      ? editingAttributes?.[variableKey]?.modifiers || []
      : editingDefenses?.[variableKey]?.modifiers || [];

    // Get names of existing modifiers (excluding the current one being edited)
    const existingNames = currentModifiers
      .map((modifier, index) =>
        index === currentModifierIndex ? null : modifier.name
      )
      .filter(Boolean);

    return variableOptions.filter(
      (option) => !existingNames.includes(option.value)
    );
  };

  // Initialize editing state when data loads
  if (attributes && !editingAttributes) {
    setEditingAttributes(JSON.parse(JSON.stringify(attributes)));
  }
  if (defenses && !editingDefenses) {
    setEditingDefenses(JSON.parse(JSON.stringify(defenses)));
  }

  const handleAttributeChange = (
    variableKey: string,
    field: "base" | "modifiers",
    value: string | number | Record<string, unknown>,
    modifierIndex?: number
  ) => {
    if (!editingAttributes) return;

    const newAttributes = { ...editingAttributes };

    if (field === "base") {
      newAttributes[variableKey] = {
        ...newAttributes[variableKey],
        base: Number(value),
      };
    } else if (field === "modifiers" && modifierIndex !== undefined) {
      const modifier = newAttributes[variableKey].modifiers[modifierIndex];
      const updatedModifier = {
        ...modifier,
        ...(value as Record<string, unknown>),
      };

      // If this is a custom modifier and the custom name changed, update the name/id
      if (
        updatedModifier.custom &&
        typeof value === "object" &&
        value !== null &&
        "label" in value &&
        typeof value.label === "string"
      ) {
        const customId = generateCustomModifierId(variableKey, value.label);
        updatedModifier.name = customId;
      }

      newAttributes[variableKey].modifiers[modifierIndex] = updatedModifier;
    }

    setEditingAttributes(newAttributes);
  };

  const handleDefenseChange = (
    variableKey: string,
    field: "base" | "modifiers",
    value: string | number | Record<string, unknown>,
    modifierIndex?: number
  ) => {
    if (!editingDefenses) return;

    const newDefenses = { ...editingDefenses };

    if (field === "base") {
      newDefenses[variableKey] = {
        ...newDefenses[variableKey],
        base: Number(value),
      };
    } else if (field === "modifiers" && modifierIndex !== undefined) {
      const modifier = newDefenses[variableKey].modifiers[modifierIndex];
      const updatedModifier = {
        ...modifier,
        ...(value as Record<string, unknown>),
      };

      // If this is a custom modifier and the custom name changed, update the name/id
      if (
        updatedModifier.custom &&
        typeof value === "object" &&
        value !== null &&
        "label" in value &&
        typeof value.label === "string"
      ) {
        const customId = generateCustomModifierId(variableKey, value.label);
        updatedModifier.name = customId;
      }

      newDefenses[variableKey].modifiers[modifierIndex] = updatedModifier;
    }

    setEditingDefenses(newDefenses);
  };

  const addModifier = (variableKey: string, isAttributes: boolean) => {
    if (isAttributes && editingAttributes) {
      const newAttributes = { ...editingAttributes };
      newAttributes[variableKey].modifiers.push({
        name: "",
        mod: 0,
        label: "",
        custom: false,
      });
      setEditingAttributes(newAttributes);
    } else if (!isAttributes && editingDefenses) {
      const newDefenses = { ...editingDefenses };
      newDefenses[variableKey].modifiers.push({
        name: "",
        mod: 0,
        label: "",
        custom: false,
      });
      setEditingDefenses(newDefenses);
    }
  };

  const deleteModifier = (
    variableKey: string,
    modifierIndex: number,
    isAttributes: boolean
  ) => {
    if (isAttributes && editingAttributes) {
      const newAttributes = { ...editingAttributes };
      newAttributes[variableKey].modifiers.splice(modifierIndex, 1);
      setEditingAttributes(newAttributes);
    } else if (!isAttributes && editingDefenses) {
      const newDefenses = { ...editingDefenses };
      newDefenses[variableKey].modifiers.splice(modifierIndex, 1);
      setEditingDefenses(newDefenses);
    }
  };

  const handleSaveAttributes = async () => {
    if (!editingAttributes) return;

    try {
      await setAttributesMutation.mutateAsync(editingAttributes);
      toast.success("Attributes updated successfully!");
    } catch {
      toast.error("Failed to update attributes");
    }
  };

  const handleSaveDefenses = async () => {
    if (!editingDefenses) return;

    try {
      await setDefensesMutation.mutateAsync(editingDefenses);
      toast.success("Defenses updated successfully!");
    } catch {
      toast.error("Failed to update defenses");
    }
  };

  const handleRefresh = () => {
    refetchAttributes();
    refetchDefenses();
    setEditingAttributes(null);
    setEditingDefenses(null);
    toast.success("Data refreshed!");
  };

  if (loadingAttributes || loadingDefenses) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (attributesError || defensesError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">Error loading data</p>
        <Button onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Variables Manager</h1>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="attributes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="defenses">Defenses</TabsTrigger>
        </TabsList>

        <TabsContent value="attributes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Attributes Variables</h2>
            <Button
              onClick={handleSaveAttributes}
              disabled={setAttributesMutation.isPending}
            >
              {setAttributesMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {editingAttributes &&
              Object.entries(editingAttributes).map(([key, config]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`${key}-base`}>Base Value</Label>
                      <Input
                        id={`${key}-base`}
                        type="number"
                        value={config.base}
                        onChange={(e) =>
                          handleAttributeChange(key, "base", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Modifiers</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addModifier(key, true)}
                          className="h-8 px-2"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {config.modifiers.map((modifier, index) => (
                          <div
                            key={index}
                            className="space-y-2 p-3 border rounded-lg"
                          >
                            <div className="flex gap-2">
                              {modifier.custom ? (
                                <Input
                                  placeholder="Custom modifier name"
                                  value={modifier.label || ""}
                                  onChange={(e) =>
                                    handleAttributeChange(
                                      key,
                                      "modifiers",
                                      { label: e.target.value },
                                      index
                                    )
                                  }
                                  className="flex-1"
                                />
                              ) : (
                                <Select
                                  value={modifier.name}
                                  onValueChange={(value) =>
                                    handleAttributeChange(
                                      key,
                                      "modifiers",
                                      { name: value },
                                      index
                                    )
                                  }
                                >
                                  <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select variable" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getAvailableOptions(key, true, index).map(
                                      (option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                              <Input
                                placeholder="Mod"
                                type="number"
                                value={modifier.mod || ""}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    key,
                                    "modifiers",
                                    { mod: Number(e.target.value) },
                                    index
                                  )
                                }
                                className="w-20"
                              />
                              {!modifier.custom && (
                                <Input
                                  placeholder="Label"
                                  value={modifier.label || ""}
                                  onChange={(e) =>
                                    handleAttributeChange(
                                      key,
                                      "modifiers",
                                      { label: e.target.value },
                                      index
                                    )
                                  }
                                  className="w-24"
                                />
                              )}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => deleteModifier(key, index, true)}
                                className="h-10 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${key}-${index}-custom`}
                                checked={modifier.custom || false}
                                onCheckedChange={(checked: boolean) =>
                                  handleAttributeChange(
                                    key,
                                    "modifiers",
                                    { custom: checked },
                                    index
                                  )
                                }
                              />
                              <Label
                                htmlFor={`${key}-${index}-custom`}
                                className="text-sm"
                              >
                                Custom modifier
                              </Label>
                            </div>
                            {modifier.custom && modifier.name && (
                              <div className="text-xs text-muted-foreground">
                                ID: {modifier.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="defenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Defenses Variables</h2>
            <Button
              onClick={handleSaveDefenses}
              disabled={setDefensesMutation.isPending}
            >
              {setDefensesMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {editingDefenses &&
              Object.entries(editingDefenses).map(([key, config]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="capitalize">{key}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor={`${key}-base`}>Base Value</Label>
                      <Input
                        id={`${key}-base`}
                        type="number"
                        value={config.base}
                        onChange={(e) =>
                          handleDefenseChange(key, "base", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Modifiers</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addModifier(key, false)}
                          className="h-8 px-2"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {config.modifiers.map((modifier, index) => (
                          <div
                            key={index}
                            className="space-y-2 p-3 border rounded-lg"
                          >
                            <div className="flex gap-2">
                              {modifier.custom ? (
                                <Input
                                  placeholder="Custom modifier name"
                                  value={modifier.label || ""}
                                  onChange={(e) =>
                                    handleDefenseChange(
                                      key,
                                      "modifiers",
                                      { label: e.target.value },
                                      index
                                    )
                                  }
                                  className="flex-1"
                                />
                              ) : (
                                <Select
                                  value={modifier.name}
                                  onValueChange={(value) =>
                                    handleDefenseChange(
                                      key,
                                      "modifiers",
                                      { name: value },
                                      index
                                    )
                                  }
                                >
                                  <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select variable" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getAvailableOptions(key, false, index).map(
                                      (option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                              <Input
                                placeholder="Mod"
                                type="number"
                                value={modifier.mod || ""}
                                onChange={(e) =>
                                  handleDefenseChange(
                                    key,
                                    "modifiers",
                                    { mod: Number(e.target.value) },
                                    index
                                  )
                                }
                                className="w-20"
                              />
                              {!modifier.custom && (
                                <Input
                                  placeholder="Label"
                                  value={modifier.label || ""}
                                  onChange={(e) =>
                                    handleDefenseChange(
                                      key,
                                      "modifiers",
                                      { label: e.target.value },
                                      index
                                    )
                                  }
                                  className="w-24"
                                />
                              )}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  deleteModifier(key, index, false)
                                }
                                className="h-10 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`${key}-${index}-custom`}
                                checked={modifier.custom || false}
                                onCheckedChange={(checked: boolean) =>
                                  handleDefenseChange(
                                    key,
                                    "modifiers",
                                    { custom: checked },
                                    index
                                  )
                                }
                              />
                              <Label
                                htmlFor={`${key}-${index}-custom`}
                                className="text-sm"
                              >
                                Custom modifier
                              </Label>
                            </div>
                            {modifier.custom && modifier.name && (
                              <div className="text-xs text-muted-foreground">
                                ID: {modifier.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
