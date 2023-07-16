using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Candies.Commands.Create;
using CandyShop.Application.Features.Candies.Commands.Delete;
using CandyShop.Application.Features.Candies.Commands.Update;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Candies;

[MutationType]
public sealed class CandyMutations
{
    public async Task<CandyResponse> CreateCandyAsync(
        CreateCandyRequest request,
        IFile file,
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        var command = mapper.Map<CreateCandyCommand>(request);
        Result<Candy> result = await sender.Send(command, token);
        using var stream = File.Create(System.IO.Path.Combine("wwwroot", "images", result.Value!.Image));
        await file.CopyToAsync(stream, token);
        return MapToCandyResponse(mapper, result.Value!);
    }

    public async Task<CandyResponse> UpdateCandyAsync(
        Guid id,
        UpdateCandyRequest request,
        IFile? file,
        [Service] IMapper mapper,
        [Service] ISender sender,
        [Service] ITopicEventSender eventSender,
        CancellationToken token)
    {
        var command = mapper.Map<UpdateCandyCommand>((id, request));
        Result<Candy> result = await sender.Send(command, token);
        if (file is not null)
        {
            using var stream = File.Create(System.IO.Path.Combine("wwwroot", "images", result.Value!.Image));
            await file.CopyToAsync(stream, token);
        }
        if (!result.IsSuccess) result.HandleException();
        var response = MapToCandyResponse(mapper, result.Value!);
        await eventSender.SendAsync(nameof(UpdateCandyAsync), response, token);
        return response;
    }

    public async Task<CandyResponse> DeleteCandyAsync(
        Guid id,
        [Service] IMapper mapper,
        [Service] ISender sender,
        [Service] ITopicEventSender eventSender,
        CancellationToken token)
    {
        var command = mapper.Map<DeleteCandyCommand>(id);
        Result<Candy> result = await sender.Send(command, token);
        if (!result.IsSuccess) result.HandleException();
        var response = MapToCandyResponse(mapper, result.Value!);
        await eventSender.SendAsync(nameof(DeleteCandyAsync), response, token);
        return response;
    }

    private static CandyResponse MapToCandyResponse(IMapper mapper, Candy candy)
    {
        var response = mapper.Map<CandyResponse>(candy);
        return response;
    }
}